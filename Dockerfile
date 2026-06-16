# ใช้ image ทางการของ Puppeteer ที่มี Chrome + ไลบรารีครบ (รองรับดึงสดจริง)
FROM ghcr.io/puppeteer/puppeteer:23.6.0

# ไม่ต้องโหลด Chromium ซ้ำ — ใช้ Chrome ที่มากับ image อยู่แล้ว
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    NODE_ENV=production \
    SCRAPER_MODE=puppeteer

# image นี้รันด้วย user "pptruser" — ติดตั้งด้วย root ก่อนแล้วค่อยคืนสิทธิ์
USER root
WORKDIR /usr/src/app

# ติดตั้ง dependency ก่อน (ใช้ cache layer ได้)
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# คัดลอกซอร์สที่เหลือ แล้วคืนสิทธิ์ให้ pptruser
COPY . .
RUN chown -R pptruser:pptruser /usr/src/app
USER pptruser

EXPOSE 3000
CMD ["node", "server.js"]
