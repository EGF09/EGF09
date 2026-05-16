# Projeyi Çalıştırma Rehberi

Bu proje, statik bir HTML dosyasından modern, dinamik ve kolay yönetilebilir bir **Next.js 14** yapısına dönüştürülmüştür. İçerikleri (projeler, yazılar, deneyimler) doğrudan site üzerinden yönetebileceğiniz bir **Yönetim Paneli** entegre edilmiştir.

## Ön Gereksinimler

Bilgisayarınızda aşağıdaki yazılımların kurulu olduğundan emin olun:
- [Node.js](https://nodejs.org/tr/) (v18.x veya üzeri önerilir)

## Kurulum ve Çalıştırma

Projeyi yerel sunucunuzda çalıştırmak için aşağıdaki adımları izleyin:

**1. Bağımlılıkları Yükleyin**
Eğer henüz yüklemediyseniz, proje dizininde bir terminal (komut satırı) açarak gerekli Node.js paketlerini indirin:
```bash
npm install
```

**2. Geliştirici Sunucusunu Başlatın**
Uygulamayı geliştirme modunda çalıştırmak için:
```bash
npm run dev
```

Bu komutu girdikten sonra projeniz yerel sunucunuzda hazır hale gelecektir. Tarayıcınızı açıp aşağıdaki adreslere gidebilirsiniz:

- **Ana Site (Portfolyo):** [http://localhost:3000](http://localhost:3000)
- **Yönetim Paneli (Admin):** [http://localhost:3000/admin](http://localhost:3000/admin) *(Ayrıca ana sayfanın sağ üst kısmındaki "Düzenle" butonundan da panele erişebilirsiniz.)*

## İçerik Yönetimi Nasıl Yapılır?

- `/admin` paneline girdiğinizde kişisel bilgilerinizi, projelerinizi, deneyimlerinizi ve iletişim bilgilerinizi göreceksiniz.
- Yeni bir alan ekleyebilir (+ Yeni Proje Ekle, + Yeni Deneyim Ekle), mevcut olanları silebilir ya da dilediğiniz gibi düzenleyebilirsiniz.
- Değişikliklerinizi yaptıktan sonra sayfanın sağ üst köşesindeki **"Kaydet"** butonuna basmanız yeterlidir. Tüm veriler projedeki `data.json` dosyasına kaydedilecek ve anında ana sitenize yansıyacaktır.

## Production (Canlıya Alma) İçin Derleme

Projeyi canlı sunucunuza (Vercel, Netlify vb.) yüklemeden önce veya tamamen derlenmiş, optimize halini çalıştırmak için:

1. Projeyi derleyin:
```bash
npm run build
```

2. Derlenmiş halini başlatın:
```bash
npm start
```
