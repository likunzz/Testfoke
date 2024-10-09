# ใช้ Nginx เป็น base image
FROM nginx:latest

# คัดลอกไฟล์ nginx.conf ไปยัง container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# คัดลอกไฟล์ HTML ไปยัง container
COPY index.html /usr/share/nginx/html