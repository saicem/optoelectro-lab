import zlib from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')
const iconsDir = path.resolve(publicDir, 'icons')

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

function crc32(data) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? ((crc >>> 1) ^ 0xEDB88320) : (crc >>> 1)
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

function createChunk(type, data) {
  const lengthBuf = Buffer.alloc(4)
  lengthBuf.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcData = Buffer.concat([typeBuf, data])
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(crcData), 0)
  return Buffer.concat([lengthBuf, typeBuf, data, crcBuf])
}

function setPixel(data, width, x, y, r, g, b, a = 255) {
  const offset = y * (width * 4 + 1) + 1 + x * 4
  data[offset] = r
  data[offset + 1] = g
  data[offset + 2] = b
  data[offset + 3] = a
}

function drawCircle(data, width, height, cx, cy, radius, r, g, b, a = 255) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist <= radius) {
        // Anti-aliasing at edge
        const alpha = dist > radius - 1 ? Math.round((radius - dist + 1) * a) : a
        if (alpha > 0) {
          const offset = y * (width * 4 + 1) + 1 + x * 4
          data[offset] = r
          data[offset + 1] = g
          data[offset + 2] = b
          data[offset + 3] = Math.min(255, Math.max(0, alpha))
        }
      }
    }
  }
}

function drawLine(data, width, height, x1, y1, x2, y2, strokeWidth, r, g, b, a = 255) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return
  const ux = dx / len
  const uy = dy / len
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const vx = x - x1
      const vy = y - y1
      const t = vx * ux + vy * uy
      if (t < 0 || t > len) continue
      const px = x1 + t * ux
      const py = y1 + t * uy
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2)
      if (dist <= strokeWidth / 2) {
        const alpha = dist > strokeWidth / 2 - 1 ? Math.round(((strokeWidth / 2) - dist + 1) * a) : a
        if (alpha > 0) {
          const offset = y * (width * 4 + 1) + 1 + x * 4
          data[offset] = r
          data[offset + 1] = g
          data[offset + 2] = b
          data[offset + 3] = Math.min(255, Math.max(0, alpha))
        }
      }
    }
  }
}

function drawSineWave(data, width, height, cx, cy, amplitude, freq, phase, strokeWidth, r, g, b, a = 255) {
  const points = []
  const steps = width * 2
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width * 0.6 + width * 0.15
    const y = cy + amplitude * Math.sin(freq * (x / width) * Math.PI * 2 + phase)
    points.push({ x: Math.round(x), y: Math.round(y) })
  }
  
  for (let i = 0; i < points.length - 1; i++) {
    drawLine(data, width, height, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, strokeWidth, r, g, b, a)
  }
}

function createIcon(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(size, 0)
  ihdrData.writeUInt32BE(size, 4)
  ihdrData[8] = 8
  ihdrData[9] = 6
  ihdrData[10] = 0
  ihdrData[11] = 0
  ihdrData[12] = 0
  const ihdr = createChunk('IHDR', ihdrData)
  
  const rawData = Buffer.alloc(size * (size * 4 + 1), 0)
  for (let y = 0; y < size; y++) {
    rawData[y * (size * 4 + 1)] = 0
  }
  
  // Fill background (#0A0E17)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      setPixel(rawData, size, x, y, 10, 14, 23)
    }
  }
  
  const cx = size / 2
  const cy = size / 2
  
  // Center glow dot
  drawCircle(rawData, size, size, cx, cy, size * 0.12, 0, 212, 255, 80)
  drawCircle(rawData, size, size, cx, cy, size * 0.06, 0, 212, 255, 200)
  
  // Center beam (vertical line)
  drawLine(rawData, size, size, cx, size * 0.1, cx, size * 0.9, Math.max(2, size * 0.04), 0, 212, 255, 220)
  
  // I wave (green, left side)
  const amp = size * 0.12
  drawSineWave(rawData, size, size, cx, cy, amp, 2.0, 0, Math.max(1.5, size * 0.025), 0, 255, 136, 200)
  
  // Q wave (purple, right side)
  drawSineWave(rawData, size, size, cx, cy, amp, 2.0, Math.PI / 2, Math.max(1.5, size * 0.025), 168, 85, 247, 200)
  
  const compressed = zlib.deflateSync(rawData)
  const idat = createChunk('IDAT', compressed)
  const iend = createChunk('IEND', Buffer.alloc(0))
  
  return Buffer.concat([signature, ihdr, idat, iend])
}

const sizes = [192, 512]

for (const size of sizes) {
  const png = createIcon(size)
  const filePath = path.join(publicDir, 'icons', `icon-${size}x${size}.png`)
  fs.writeFileSync(filePath, png)
  console.log(`Generated: public/icons/icon-${size}x${size}.png (${(png.length / 1024).toFixed(1)} KB)`)
}

console.log('PWA icons generated successfully!')
