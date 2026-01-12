# 🚀 Form Tracking - Vercel Deployment

Hệ thống form khảo sát bất động sản với tracking tự động cho nhiều nhóm.

## ✨ Tính năng

- ✅ Multi-step wizard (3 bước)
- ✅ Tracking tự động theo group
- ✅ Responsive design
- ✅ Validation thông minh
- ✅ Tích hợp Google Sheets

## 🚀 Deploy lên Vercel

### Cách 1: Vercel CLI (Nhanh nhất)

```bash
# Cài Vercel CLI (chỉ cần 1 lần)
npm i -g vercel

# Deploy
cd form-tracking-vercel
vercel

# Làm theo hướng dẫn:
# - Login với GitHub/GitLab/Email
# - Chọn "Yes" để setup project
# - Nhấn Enter để dùng settings mặc định
```

### Cách 2: Vercel Dashboard (Dễ nhất)

1. Vào https://vercel.com
2. Đăng nhập với GitHub/GitLab/Email
3. Click **"Add New Project"**
4. Chọn **"Import Git Repository"** HOẶC **"Deploy from folder"**
5. Upload folder `form-tracking-vercel`
6. Click **"Deploy"**
7. Đợi 30 giây → Xong!

### Cách 3: GitHub + Vercel (Tự động)

1. Tạo repo mới trên GitHub
2. Push code lên:
```bash
cd form-tracking-vercel
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/form-tracking.git
git push -u origin main
```
3. Vào Vercel → Import từ GitHub
4. Chọn repo → Deploy

## 🔗 Sau khi deploy

Bạn sẽ có URL dạng:
```
https://form-tracking-meey.vercel.app
```

### Tạo links cho 10 groups:

```
Group 1: https://form-tracking-meey.vercel.app/?group=facebook
Group 2: https://form-tracking-meey.vercel.app/?group=zalo
Group 3: https://form-tracking-meey.vercel.app/?group=telegram
...
```

## 📊 Setup Google Sheets

1. Tạo Google Sheet với cột: `Timestamp | Group | Nhu cầu | Kênh | Vấn đề quan tâm`
2. Tạo Apps Script (Extensions → Apps Script)
3. Paste code:

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

4. Deploy → Web app → Copy URL
5. Mở `script.js`, thay `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` bằng URL vừa copy
6. Deploy lại Vercel (tự động nếu dùng GitHub)

## 🎯 Custom Domain (Optional)

Trong Vercel Dashboard:
1. Settings → Domains
2. Thêm domain của bạn (vd: `form.meey.vn`)
3. Cập nhật DNS records theo hướng dẫn

---

**Chúc deploy thành công!** 🎉
