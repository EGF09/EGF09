'use client';
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); });
  }, []);

  const handleSave = async () => {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    alert('Tüm değişiklikler başarıyla kaydedildi!');
  };

  if (loading) return <div style={{ color: 'white', padding: 50, textAlign: 'center' }}>Yükleniyor...</div>;

  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 className="admin-title" style={{ border: 'none', marginBottom: 0, paddingBottom: 0 }}>Yönetim Paneli</h1>
        <button className="admin-btn" onClick={handleSave}>Kaydet</button>
      </div>
      
      {/* Hero Section */}
      <div className="admin-section">
        <h2 className="admin-title">Kişisel Bilgiler (Giriş)</h2>
        <div className="admin-row">
          <input className="admin-input" value={data.hero.greeting} onChange={e => setData({...data, hero: {...data.hero, greeting: e.target.value}})} placeholder="Selamlama (örn: Merhaba, ben)" />
          <input className="admin-input" value={data.hero.name} onChange={e => setData({...data, hero: {...data.hero, name: e.target.value}})} placeholder="Ad" />
          <input className="admin-input" value={data.hero.accentName} onChange={e => setData({...data, hero: {...data.hero, accentName: e.target.value}})} placeholder="Soyad (Vurgulu renkli)" />
        </div>
        <div className="admin-row">
          <input className="admin-input" value={data.hero.badge} onChange={e => setData({...data, hero: {...data.hero, badge: e.target.value}})} placeholder="Durum Rozeti (örn: Available for work)" />
        </div>
      </div>

      {/* Projects Section */}
      <div className="admin-section">
        <h2 className="admin-title">Projeler</h2>
        {data.projects.map((p: any, i: number) => (
          <div key={i} className="admin-list-item">
            <div className="admin-row">
              <input className="admin-input" value={p.name} onChange={e => {
                const newProj = [...data.projects]; newProj[i].name = e.target.value; setData({...data, projects: newProj});
              }} placeholder="Proje Adı" />
              <input className="admin-input" value={p.icon} onChange={e => {
                const newProj = [...data.projects]; newProj[i].icon = e.target.value; setData({...data, projects: newProj});
              }} placeholder="İkon" style={{flex: '0 0 80px'}} />
            </div>
            <textarea className="admin-textarea" value={p.desc} onChange={e => {
                const newProj = [...data.projects]; newProj[i].desc = e.target.value; setData({...data, projects: newProj});
              }} placeholder="Proje Açıklaması" />
            <button className="admin-btn-secondary" onClick={() => {
              const newProj = data.projects.filter((_:any, index:number) => index !== i);
              setData({...data, projects: newProj});
            }}>Sil</button>
          </div>
        ))}
        <button className="admin-btn" onClick={() => {
          setData({...data, projects: [...data.projects, { name: "Yeni Proje", desc: "Açıklama...", icon: "📌", tags: [], links: [], color: "var(--mint)", featured: false, num: "#000" }]});
        }}>+ Yeni Proje Ekle</button>
      </div>

      {/* Experience Section */}
      <div className="admin-section">
        <h2 className="admin-title">Deneyimler</h2>
        {data.experience.map((e: any, i: number) => (
          <div key={i} className="admin-list-item">
            <div className="admin-row">
              <input className="admin-input" value={e.company} onChange={ev => {
                const newExp = [...data.experience]; newExp[i].company = ev.target.value; setData({...data, experience: newExp});
              }} placeholder="Şirket" />
              <input className="admin-input" value={e.role} onChange={ev => {
                const newExp = [...data.experience]; newExp[i].role = ev.target.value; setData({...data, experience: newExp});
              }} placeholder="Pozisyon" />
            </div>
            <div className="admin-row">
              <input className="admin-input" value={e.date} onChange={ev => {
                const newExp = [...data.experience]; newExp[i].date = ev.target.value; setData({...data, experience: newExp});
              }} placeholder="Tarih" />
            </div>
            <textarea className="admin-textarea" value={e.desc} onChange={ev => {
                const newExp = [...data.experience]; newExp[i].desc = ev.target.value; setData({...data, experience: newExp});
              }} placeholder="Açıklama" />
            <button className="admin-btn-secondary" onClick={() => {
              const newExp = data.experience.filter((_:any, index:number) => index !== i);
              setData({...data, experience: newExp});
            }}>Sil</button>
          </div>
        ))}
        <button className="admin-btn" onClick={() => {
          setData({...data, experience: [...data.experience, { company: "Yeni Şirket", role: "Pozisyon", date: "Tarih", desc: "Açıklama...", bullets: [], active: false }]});
        }}>+ Yeni Deneyim Ekle</button>
      </div>

      {/* Contact Section */}
      <div className="admin-section">
        <h2 className="admin-title">İletişim & Sosyal Medya</h2>
        <div className="admin-row">
          <input className="admin-input" value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} placeholder="Email" />
        </div>
        <div className="admin-row">
          <input className="admin-input" value={data.contact.linkedin} onChange={e => setData({...data, contact: {...data.contact, linkedin: e.target.value}})} placeholder="LinkedIn Handle" />
        </div>
        <div className="admin-row">
          <input className="admin-input" value={data.contact.github} onChange={e => setData({...data, contact: {...data.contact, github: e.target.value}})} placeholder="GitHub Handle" />
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="/" style={{ color: 'var(--mint)', textDecoration: 'underline' }}>← Ana Siteye Dön</a>
      </div>
    </div>
  );
}
