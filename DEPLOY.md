# 🚀 Hướng Dẫn Deploy Lên Vercel - Siêu Đơn Giản

## 📦 Folder đã sẵn sàng!

Folder `form-tracking-vercel` đã có đầy đủ files để deploy:
- ✅ `index.html` - Form chính
- ✅ `style.css` - Styling
- ✅ `script.js` - Logic
- ✅ `vercel.json` - Config Vercel
- ✅ `.gitignore` - Ignore files
- ✅ `README.md` - Hướng dẫn

---

## 🎯 Cách Deploy (Chọn 1 trong 3)

### **Cách 1: Vercel CLI** ⚡ (Nhanh nhất - 30 giây)

**Bước 1: Cài Vercel CLI**
```bash
npm i -g vercel
```

**Bước 2: Deploy**
```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\form-tracking-vercel
vercel
```

**Bước 3: Làm theo hướng dẫn**
- Login (chọn GitHub/Email)
- Nhấn Enter để dùng settings mặc định
- Đợi 10 giây → Xong!

**Kết quả:**
```
✅ Deployed to production: https://form-tracking-meey.vercel.app
```

---

### **Cách 2: Vercel Web Dashboard** 🌐 (Dễ nhất - Không cần code)

**Bước 1:** Vào https://vercel.com/new

**Bước 2:** Đăng nhập (GitHub/GitLab/Email)

**Bước 3:** Kéo thả folder `form-tracking-vercel` vào trang web

**Bước 4:** Click "Deploy"

**Bước 5:** Đợi 30 giây → Xong!

---

### **Cách 3: GitHub + Vercel** 🔄 (Tự động deploy khi update)

**Bước 1: Tạo GitHub repo**
```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\form-tracking-vercel
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/form-tracking.git
git push -u origin main
```

**Bước 2:** Vào https://vercel.com/new

**Bước 3:** Click "Import Git Repository"

**Bước 4:** Chọn repo vừa tạo → Deploy

**Lợi ích:** Mỗi lần push code mới lên GitHub → Vercel tự động deploy!

---

## 🔗 Sau khi deploy thành công

### Bạn sẽ có URL:
```
https://form-tracking-meey-abc123.vercel.app
```

### Tạo 10 links cho 10 groups:

```
Group 1 (Facebook):  https://your-url.vercel.app/?group=facebook
Group 2 (Zalo):      https://your-url.vercel.app/?group=zalo
Group 3 (Telegram):  https://your-url.vercel.app/?group=telegram
Group 4 (LinkedIn):  https://your-url.vercel.app/?group=linkedin
Group 5 (Twitter):   https://your-url.vercel.app/?group=twitter
Group 6 (Instagram): https://your-url.vercel.app/?group=instagram
Group 7 (YouTube):   https://your-url.vercel.app/?group=youtube
Group 8 (TikTok):    https://your-url.vercel.app/?group=tiktok
Group 9 (Email):     https://your-url.vercel.app/?group=email
Group 10 (Website):  https://your-url.vercel.app/?group=website
```

### Rút gọn links bằng Bitly (Optional):
```
https://bit.ly/meey-fb    → Group Facebook
https://bit.ly/meey-zalo  → Group Zalo
...
```

---

## 📊 Setup Google Sheets (Để lưu data)

### Bước 1: Tạo Google Sheet
1. Tạo sheet mới: https://sheets.new
2. Đặt tên: "Form Tracking - Meey"
3. Tạo header row:
   ```
   Timestamp | Group | Nhu cầu | Kênh | Vấn đề quan tâm
   ```

### Bước 2: Tạo Apps Script
1. Extensions → Apps Script
2. Xóa code mặc định
3. Paste code này:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.group,
      data.need,
      data.channels,
      data.concerns
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click "Deploy" → "New deployment"
5. Type: "Web app"
6. Execute as: "Me"
7. Who has access: "Anyone"
8. Click "Deploy"
9. **Copy URL** (dạng: `https://script.google.com/macros/s/ABC.../exec`)

### Bước 3: Cập nhật script.js
1. Mở file `script.js` trong folder
2. Tìm dòng:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Thay bằng URL vừa copy:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC.../exec';
   ```
4. Uncomment code gửi data (xóa `/*` và `*/`)
5. **Deploy lại Vercel** (nếu dùng CLI: chạy `vercel --prod`)

---

## ✅ Test Form

1. Mở URL Vercel của bạn
2. Thêm `?group=test` vào URL
3. Điền form và submit
4. Kiểm tra Google Sheet → Phải có data mới!

---

## 🎨 Custom Domain (Optional)

Nếu bạn có domain riêng (vd: `form.meey.vn`):

1. Vào Vercel Dashboard → Settings → Domains
2. Add domain: `form.meey.vn`
3. Cập nhật DNS records theo hướng dẫn Vercel
4. Đợi 5-10 phút → Xong!

---

## 🔥 Tips

- **Free tier Vercel**: Unlimited bandwidth, 100GB/month
- **Auto HTTPS**: Vercel tự động cấp SSL certificate
- **Global CDN**: Form load nhanh khắp thế giới
- **Analytics**: Xem traffic trong Vercel Dashboard

---

**Bạn chọn cách nào để deploy?** 🚀
