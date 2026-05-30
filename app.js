/* TashiGo - Akıllı Durum Yönetimi & İş Mantığı V2 (Yenilenen Tasarım) */

// Global Uygulama Durumu (State)
let state = {
  currentView: 'landing', // 'landing' | 'auth' | 'dashboard'
  dashboardSubView: 'overview', // 'overview' | 'sender' | 'carrier' | 'receiver' | 'lockers' | 'profile'
  user: null, // { name: '', tc: '', phone: '', birthYear: '', kycStep: 1, kycVerified: false, score: 5.0, verifiedAt: '' }
  activeRole: 'sender', // 'sender' | 'carrier' | 'receiver'
  sidebarCollapsed: false,
  
  // Şehir listesi
  cities: ['Bursa', 'Kütahya', 'İstanbul', 'Ankara', 'İzmir'],
  
  // Detaylandırılmış ve Konum/GPS Bilgileri Eklenmiş Dolap İstasyonları
  stations: {
    'bursa': {
      id: 'bursa',
      name: 'Bursa Otogar Merkez Dolabı',
      address: 'Bursa Şehirler Arası Otobüs Terminali, Peron 12 Yanı',
      gps: '40.2197° N, 29.0601° E',
      temp: '18°C',
      ping: '12ms',
      connection: 'Fiber - Aktif',
      slots: [
        { id: 1, size: 'Küçük', status: 'occupied', detail: 'Evrak (0.4 kg)' },
        { id: 2, size: 'Küçük', status: 'empty' },
        { id: 3, size: 'Orta', status: 'occupied', detail: 'Kitap & Kıyafet (2.5 kg)' },
        { id: 4, size: 'Orta', status: 'empty' },
        { id: 5, size: 'Orta', status: 'empty' },
        { id: 6, size: 'Büyük', status: 'occupied', detail: 'Sırt Çantası (6.0 kg)' },
        { id: 7, size: 'Büyük', status: 'empty' },
        { id: 8, size: 'Büyük', status: 'empty' }
      ]
    },
    'kutahya': {
      id: 'kutahya',
      name: 'Kütahya Otogar Gel-Al Dolabı',
      address: 'Kütahya Otobüs Terminali, Giriş Holü A Kapısı Yanı',
      gps: '39.4242° N, 29.9833° E',
      temp: '14°C',
      ping: '16ms',
      connection: 'Geleneksel - Kararlı',
      slots: [
        { id: 1, size: 'Küçük', status: 'empty' },
        { id: 2, size: 'Küçük', status: 'empty' },
        { id: 3, size: 'Orta', status: 'empty' },
        { id: 4, size: 'Orta', status: 'empty' },
        { id: 5, size: 'Büyük', status: 'empty' },
        { id: 6, size: 'Büyük', status: 'empty' }
      ]
    },
    'istanbul': {
      id: 'istanbul',
      name: 'İstanbul Kadıköy Metro İstasyonu Dolabı',
      address: 'Kadıköy Metro İstasyonu, Rıhtım Çıkışı Turnikeler Yanı',
      gps: '40.9901° N, 29.0291° E',
      temp: '21°C',
      ping: '8ms',
      connection: 'Fiber - Ultra Aktif',
      slots: [
        { id: 1, size: 'Küçük', status: 'occupied', detail: 'Elektronik Parça (1.2 kg)' },
        { id: 2, size: 'Küçük', status: 'occupied', detail: 'Anahtar Seti (0.2 kg)' },
        { id: 3, size: 'Orta', status: 'empty' },
        { id: 4, size: 'Orta', status: 'occupied', detail: 'Kışlık Mont (1.8 kg)' },
        { id: 5, size: 'Büyük', status: 'empty' },
        { id: 6, size: 'Büyük', status: 'empty' },
        { id: 7, size: 'Büyük', status: 'empty' },
        { id: 8, size: 'Büyük', status: 'empty' }
      ]
    },
    'ankara': {
      id: 'ankara',
      name: 'Ankara AŞTİ Ana Arter Dolabı',
      address: 'AŞTİ Terminali, Gelen Yolcu Katı Danışma Karşısı',
      gps: '39.9208° N, 32.8541° E',
      temp: '16°C',
      ping: '10ms',
      connection: 'Fiber - Aktif',
      slots: [
        { id: 1, size: 'Küçük', status: 'empty' },
        { id: 2, size: 'Küçük', status: 'empty' },
        { id: 3, size: 'Orta', status: 'empty' },
        { id: 4, size: 'Orta', status: 'empty' },
        { id: 5, size: 'Büyük', status: 'occupied', detail: 'Bavul (8.5 kg)' },
        { id: 6, size: 'Büyük', status: 'empty' }
      ]
    },
    'izmir': {
      id: 'izmir',
      name: 'İzmir Bornova Ege Üniv. Dolabı',
      address: 'Ege Üniversitesi Metro İstasyonu Çıkışı, Gençlik Caddesi',
      gps: '38.4237° N, 27.1428° E',
      temp: '23°C',
      ping: '11ms',
      connection: 'Geleneksel - Kararlı',
      slots: [
        { id: 1, size: 'Küçük', status: 'empty' },
        { id: 2, size: 'Orta', status: 'empty' },
        { id: 3, size: 'Orta', status: 'occupied', detail: 'Ders Notları (3.0 kg)' },
        { id: 4, size: 'Büyük', status: 'empty' }
      ]
    }
  },
  
  selectedHubId: 'bursa',
  
  // Aktif Slayt İndeksi (Carousel)
  activeSlide: 0,
  
  // Giriş Ekranındaki Mobil Telefon Mockup'ının Aktif Sekmesi
  phoneMockupTab: 'sender', // 'sender' | 'carrier' | 'receiver'

  // Aktif Kargolar (Mock Veritabanı)
  cargos: [
    {
      id: 'c1',
      sender: 'Ahmet Yılmaz',
      phone: '0555 123 45 67',
      origin: 'Bursa',
      destination: 'Kütahya',
      desc: 'Ders Notları ve Hırka',
      photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      size: 'Orta',
      weight: '2.0 kg',
      status: 'SECURED_IN_LOCKER_A', // 'AWAITING_LOCKER_A' | 'SECURED_IN_LOCKER_A' | 'IN_TRANSIT' | 'SECURED_IN_LOCKER_B' | 'DELIVERED'
      dropPin: '402918',
      extractPin: '509231',
      originStation: 'Bursa Otogar Merkez Dolabı',
      destStation: 'Kütahya Otogar Gel-Al Dolabı',
      carrier: null,
      carrierRating: 0,
      price: '115 TL',
      createdAt: '29.05.2026 14:30'
    }
  ],

  // Form ve Akış Geçici Değişkenleri
  tempSenderCargo: {
    origin: 'Bursa',
    destination: 'Kütahya',
    desc: '',
    size: 'Küçük',
    weight: '1.0 kg',
    photo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80' // Varsayılan koli görseli
  },

  tempCarrierMatch: null, // Detay incelenen kargo
  
  // Sanal Dolap Terminali Simülasyonu
  virtualLocker: {
    active: false,
    hubId: '',
    slotId: null,
    expectedPin: '',
    inputPin: '',
    actionType: '', // 'sender_drop' | 'carrier_pickup' | 'carrier_drop' | 'receiver_pickup'
    cargoId: '',
    screenMsg: 'Lütfen 6 Haneli Şifrenizi Girin...'
  },

  // Değerlendirme Modalı
  ratingModal: {
    active: false,
    cargoId: '',
    rating: 0
  },

  // OTP Geçici State
  otp: {
    code: '',
    input: '',
    timer: 0,
    sending: false
  },

  kycStep: 1, // 1: OTP, 2: MERNIS, 3: Yüz Tarama

  // Sistem Geri Bildirimleri
  feedbacks: [
    { id: 'f1', subject: 'Akıllı Dolap Hızı', type: 'suggest', comment: 'Bursa dolabındaki dokunmatik ekran tepkisi biraz daha hızlandırılabilir.', rating: 4, createdAt: '28.05.2026' }
  ],

  // Çift Taraflı Puanlamalar ve Yorumlar
  ratings: [
    { id: 'r1', cargoId: 'c1', fromUser: 'Ahmet Yılmaz', toUser: 'Mert Aksoy', role: 'sender_to_carrier', rating: 5, comment: 'Ders notlarım ve hırkam tertemiz ve tam vaktinde ulaştı, çok teşekkürler.', createdAt: '29.05.2026' }
  ],

  // Aktif Karşılıklı Değerlendirme Modalı Durumu
  bidirectionalRatingModal: {
    active: false,
    cargoId: '',
    fromUser: '',
    toUser: '',
    role: '', // 'sender_to_carrier' | 'carrier_to_sender' | 'carrier_to_receiver' | 'receiver_to_carrier'
    rating: 5,
    comment: ''
  }
};

// UI Güncelleme (State Değiştiğinde Çalışır)
function setState(updater) {
  if (typeof updater === 'function') {
    updater(state);
  } else {
    state = { ...state, ...updater };
  }
  render();
}

function toggleSidebar() {
  setState(s => {
    s.sidebarCollapsed = !s.sidebarCollapsed;
  });
}

function getUserScore(userName) {
  const userRatings = state.ratings.filter(r => r.toUser === userName);
  if (userRatings.length === 0) {
    if (userName === 'Ahmet Yılmaz') return 4.9;
    if (userName === 'Mehmet Kaya') return 4.7;
    return 5.0;
  }
  const total = userRatings.reduce((sum, r) => sum + r.rating, 0);
  return total / userRatings.length;
}

function getMatchPercentage(senderName) {
  const senderScore = getUserScore(senderName);
  const carrierScore = state.user ? getUserScore(state.user.name) : 5.0;
  const scoreSum = senderScore + carrierScore;
  const match = Math.round(80 + (scoreSum / 10) * 19);
  return Math.min(99, Math.max(80, match));
}


// Başarılı Bildirim Mesajı (Toast) Gösterimi
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `
    <i data-lucide="${isSuccess ? 'check-circle' : 'alert-triangle'}" style="color: ${isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'}"></i>
    <span>${message}</span>
  `;
  lucide.createIcons();
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ----------------------------------------------------
// SAYFA TASLAKLARI (TEMPLATES) VE ÇİZİM (RENDERING)
// ----------------------------------------------------

function render() {
  const root = document.getElementById('app-root');
  if (!root) return;

  if (state.currentView === 'landing') {
    root.innerHTML = renderLandingPage();
  } else if (state.currentView === 'auth') {
    root.innerHTML = renderAuthPage();
  } else if (state.currentView === 'dashboard') {
    root.innerHTML = renderDashboardLayout(renderDashboardContent());
  }

  // Sanal Dolap Modalı Açık ise Ekle (Digikala Cam Efektli Arayüzü)
  if (state.virtualLocker.active) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay spatial-overlay active';
    overlay.innerHTML = renderVirtualLockerModal();
    root.appendChild(overlay);
  }

  // Çift Taraflı Değerlendirme Modalı Açık ise Ekle
  if (state.bidirectionalRatingModal.active) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay spatial-overlay active';
    overlay.innerHTML = renderBidirectionalRatingModal();
    root.appendChild(overlay);
  }

  // Lucide ikonlarını canlandır
  lucide.createIcons();
}

// ----------------------------------------------------
// 1. DİNAMİK YENİ GİRİŞ SAYFASI (LANDING PAGE - LIGHT MODE)
// ----------------------------------------------------
function renderLandingPage() {
  // Aktif karusel slaydını hesaplayalım
  const slides = [
    {
      title: "🚗 Özel Aracınızla Kazanın",
      subtitle: "Bursa'dan Kütahya'ya giderken boş bagajınızı gelire dönüştürün. Dolaptan dolaba güvenle taşıyın.",
      bg: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80"
    },
    {
      title: "🚌 Seyahat Ederken Taşıyın",
      subtitle: "Şehirler arası otobüs yolculuklarınızda kargoları taşıyarak bilet ücretinizi amorti edin.",
      bg: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"
    },
    {
      title: "✈️ En Hızlı Express Kurye Olun",
      subtitle: "Uçuşlarınızda el bagajınızda veya kargonuzda küçük zarfları taşıyıp maksimum kazancı elde edin.",
      bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
    }
  ];
  
  const currentSlide = slides[state.activeSlide];

  return `
    <div style="background-color: var(--bg-light); min-height: 100vh;">
      
      <!-- Üst Menü -->
      <header style="max-width: 1200px; margin: 0 auto; padding: 24px 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: var(--text-dark); padding: 8px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--neon-green)">
            <i data-lucide="package-open" style="color: var(--neon-green)"></i>
          </div>
          <span style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-dark);">Tashi<span style="color: var(--neon-green)">Go</span></span>
        </div>
        <div style="display: flex; gap: 24px; align-items: center;">
          <a href="#" onclick="scrollToElement('features')" style="color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 0.9rem;">Avantajlar</a>
          <a href="#" onclick="scrollToElement('how-it-works')" style="color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 0.9rem;">Nasıl Çalışır?</a>
          <button class="btn btn-secondary" onclick="setState({currentView: 'auth'})">Hemen Katıl</button>
        </div>
      </header>

      <!-- Ana Hero Bölümü (Tere style) -->
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div class="landing-hero">
          <!-- Sol Kısım: Başlık ve Kargo Arama -->
          <div>
            <span style="background: rgba(16, 185, 129, 0.08); color: #065f46; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.15); margin-bottom: 24px; display: inline-block;">
              ⚡ YÜZ YÜZE GELMEDEN P2P TAŞIMACILIK
            </span>
            
            <h1 style="font-size: 3.6rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; font-family: 'Outfit', sans-serif; color: var(--text-dark);">
              Uygulamayı İndir,<br><span style="color: var(--neon-green)">Para Kazan</span>, Yeni Gezginlerle Eşleş!
            </h1>
            
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 40px; max-width: 540px;">
              TashiGo, şehirler arası seyahat edenlerle kargo göndericilerini akıllı dolaplar vasıtasıyla buluşturan devrimsel bir ekosistemdir.
            </p>

            <!-- Hızlı Rota Arama Çubuğu (Tere style) -->
            <div style="background: #ffffff; border: 1px solid var(--border-light); padding: 8px; border-radius: 16px; box-shadow: var(--shadow-ambient); display: flex; gap: 8px; max-width: 500px; margin-bottom: 30px;">
              <div style="flex: 1; display: flex; align-items: center; gap: 8px; padding-left: 12px;">
                <i data-lucide="map-pin" style="color: var(--neon-green); width: 18px; height: 18px;"></i>
                <input type="text" placeholder="Nereden? (örn: Bursa)" style="border: none; outline: none; font-size: 0.9rem; color: var(--text-dark); width: 100%;">
              </div>
              <div style="width: 1px; background: var(--border-light); margin: 8px 0;"></div>
              <div style="flex: 1; display: flex; align-items: center; gap: 8px; padding-left: 8px;">
                <i data-lucide="compass" style="color: var(--neon-green); width: 18px; height: 18px;"></i>
                <input type="text" placeholder="Nereye? (örn: Kütahya)" style="border: none; outline: none; font-size: 0.9rem; color: var(--text-dark); width: 100%;">
              </div>
              <button class="btn btn-primary" onclick="setState({currentView: 'auth'})">İlan Ara</button>
            </div>

            <!-- Market İndirme Butonları (Tere style) -->
            <div style="display: flex; gap: 12px;">
              <div style="background: var(--text-dark); color: #fff; padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <i data-lucide="play" style="fill: #fff; width: 18px;"></i>
                <div style="text-align: left; line-height: 1.1;">
                  <span style="font-size: 0.65rem; color: var(--text-muted); display: block;">GET IT ON</span>
                  <span style="font-size: 0.9rem; font-weight: 700;">Google Play</span>
                </div>
              </div>
              <div style="background: var(--text-dark); color: #fff; padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <i data-lucide="apple" style="fill: #fff; width: 18px;"></i>
                <div style="text-align: left; line-height: 1.1;">
                  <span style="font-size: 0.65rem; color: var(--text-muted); display: block;">Download on the</span>
                  <span style="font-size: 0.9rem; font-weight: 700;">App Store</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sağ Kısım: Dinamik Auto-Carousel (Tere/Muneef style) -->
          <div>
            <div class="hero-slider-container">
              <div class="hero-slide active">
                <div class="hero-slide-bg-vector" style="background-image: url('${currentSlide.bg}');"></div>
                <div style="position: relative; z-index: 3;">
                  <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; color: #fff;">${currentSlide.title}</h3>
                  <p style="font-size: 0.95rem; color: rgba(255,255,255,0.85);">${currentSlide.subtitle}</p>
                </div>
              </div>
              
              <!-- Karusel Göstergeleri (Dots) -->
              <div style="position: absolute; top: 30px; right: 30px; display: flex; gap: 8px; z-index: 10;">
                ${slides.map((_, i) => `
                  <div style="width: 24px; height: 4px; border-radius: 2px; background: ${state.activeSlide === i ? 'var(--neon-green)' : 'rgba(255,255,255,0.3)'}; transition: var(--transition-smooth); cursor: pointer;" onclick="changeHeroSlide(${i})"></div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- İstatistikler (Muneef style) -->
      <section style="background: #ffffff; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); padding: 40px 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; gap: 30px;">
          <div>
            <h3 style="font-size: 2.2rem; font-weight: 800; color: var(--neon-green);">500+</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">DOĞRULANMIŞ İLK KULLANICI</p>
          </div>
          <div>
            <h3 style="font-size: 2.2rem; font-weight: 800; color: var(--text-dark);">24 Saat</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">KESİNTİSİZ GÜVENLİK LOGU</p>
          </div>
          <div>
            <h3 style="font-size: 2.2rem; font-weight: 800; color: var(--neon-green);">100%</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">E-DEVLET KİMLİK KANITI</p>
          </div>
          <div>
            <h3 style="font-size: 2.2rem; font-weight: 800; color: var(--text-dark);">0 TL</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">KOMİSYON (İLK AYLARA ÖZEL)</p>
          </div>
        </div>
      </section>

      <!-- Nasıl Çalışır? (Etkileşimli Telefon Simülasyonu) -->
      <section id="how-it-works" style="max-width: 1200px; margin: 100px auto; padding: 0 20px;">
        <h2 style="text-align: center; font-size: 2.4rem; font-weight: 800; margin-bottom: 16px;">Süreç Nasıl İşler?</h2>
        <p style="text-align: center; color: var(--text-muted); max-width: 600px; margin: 0 auto 60px;">
          Gönderici, Taşıyıcı ve Alıcı asla karşı karşıya gelmez. Akıllı dolaplar sayesinde teslimat tamamen temassız yürütülür.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;">
          <!-- Sol Taraf: Telefon Mockup (İlgili Rolün Uygulama Arayüzü Gösterilir) -->
          <div>
            <div class="phone-mockup-wrapper">
              <div class="phone-screen">
                ${renderPhoneMockupContent()}
              </div>
            </div>
          </div>

          <!-- Sağ Taraf: Etkileşimli Sekmeler ve Açıklamalar (Muneef style) -->
          <div>
            <div style="display: flex; flex-direction: column; gap: 20px;">
              
              <!-- Gönderici Adımı -->
              <div class="glass-card" style="cursor: pointer; border-color: ${state.phoneMockupTab === 'sender' ? 'var(--neon-green)' : 'var(--border-light)'};" onclick="setState({phoneMockupTab: 'sender'})">
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                  <div style="background: ${state.phoneMockupTab === 'sender' ? 'var(--neon-green)' : 'var(--bg-light-gray)'}; color: ${state.phoneMockupTab === 'sender' ? '#fff' : 'var(--text-dark)'}; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; transition: var(--transition-smooth)">
                    1
                  </div>
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Gönderici Paketi Dolaba Kilitler</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">
                      Güzergah ve içerik beyanını girip ödemeyi yapın. İstasyon A dolabında kapak açma şifresini alıp paketi kilitleyin.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Taşıyıcı Adımı -->
              <div class="glass-card" style="cursor: pointer; border-color: ${state.phoneMockupTab === 'carrier' ? 'var(--neon-green)' : 'var(--border-light)'};" onclick="setState({phoneMockupTab: 'carrier'})">
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                  <div style="background: ${state.phoneMockupTab === 'carrier' ? 'var(--neon-green)' : 'var(--bg-light-gray)'}; color: ${state.phoneMockupTab === 'carrier' ? '#fff' : 'var(--text-dark)'}; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; transition: var(--transition-smooth)">
                    2
                  </div>
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Taşıyıcı Seyahat Ederken Paketi Taşır</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">
                      Güzergahındaki dolaptan paketi kontrol ederek teslim alır. Şehirler arası yolculuk yaparak hedef İstasyon B dolabına kilitler.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Alıcı Adımı -->
              <div class="glass-card" style="cursor: pointer; border-color: ${state.phoneMockupTab === 'receiver' ? 'var(--neon-green)' : 'var(--border-light)'};" onclick="setState({phoneMockupTab: 'receiver'})">
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                  <div style="background: ${state.phoneMockupTab === 'receiver' ? 'var(--neon-green)' : 'var(--bg-light-gray)'}; color: ${state.phoneMockupTab === 'receiver' ? '#fff' : 'var(--text-dark)'}; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; transition: var(--transition-smooth)">
                    3
                  </div>
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Alıcı Paketi İstasyon B'den Teslim Alır</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">
                      Paket hedef dolaba yerleştiği anda alıcıya bildirim gider. Alıcı dolaba gidip şifresini tuşlayarak kargosunu alır.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Avantajlar (Features) -->
      <section id="features" style="background: var(--bg-light-gray); padding: 100px 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <h2 style="text-align: center; font-size: 2.4rem; font-weight: 800; margin-bottom: 50px;">Neden TashiGo?</h2>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
            <!-- Avantaj 1 -->
            <div class="glass-card" style="padding: 40px; text-align: center;">
              <div style="background: rgba(16, 185, 129, 0.08); width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--neon-green)">
                <i data-lucide="trending-up" style="width: 28px; height: 28px;"></i>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">Ekstra Yolculuk Kazancı</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">
                Şehirler arası yapacağınız her seyahatte dolaplar üzerinden alacağınız paketlerle masraflarınızı karşılayın.
              </p>
            </div>
            
            <!-- Avantaj 2 -->
            <div class="glass-card" style="padding: 40px; text-align: center;">
              <div style="background: rgba(16, 185, 129, 0.08); width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--neon-green)">
                <i data-lucide="shield" style="width: 28px; height: 28px;"></i>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">Maksimum Yasal Zırh</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">
                Resmi T.C. kimlik entegrasyonu ve biyometrik selfie onaylamasıyla yasal güvenceniz %100 altındadır.
              </p>
            </div>

            <!-- Avantaj 3 -->
            <div class="glass-card" style="padding: 40px; text-align: center;">
              <div style="background: rgba(16, 185, 129, 0.08); width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--neon-green)">
                <i data-lucide="fingerprint" style="width: 28px; height: 28px;"></i>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">Temassız ve Şifreli</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">
                Kargoyu teslim ederken veya alırken hiç kimseyle temas etmeyin, yalnızca size özel tek kullanımlık şifreler kullanın.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Alt Bilgi -->
      <footer style="border-top: 1px solid var(--border-light); padding: 40px 0; text-align: center; font-size: 0.85rem; color: var(--text-muted); background: #ffffff;">
        <p>© 2026 TashiGo Akıllı Dolap P2P Kargo Ağı. Görsel kimlik referansı: Muneef & Tere & Digikala</p>
      </footer>

    </div>
  `;
}

// ----------------------------------------------------
// DİNAMİK MOBİL TELEFON EKRANI İÇERİĞİ (Nasıl Çalışır?)
// ----------------------------------------------------
function renderPhoneMockupContent() {
  const tab = state.phoneMockupTab;
  
  if (tab === 'sender') {
    return `
      <div style="text-align: center; padding-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted);">TashiGo Gönderi</span>
          <span style="font-size: 0.65rem; background: rgba(16, 185, 129, 0.1); color: var(--neon-green); padding: 2px 8px; border-radius: 10px; font-weight: 700;">1. Adım</span>
        </div>
        
        <div style="background: #ffffff; border: 1px solid var(--border-light); padding: 12px; border-radius: 12px; text-align: left; margin-bottom: 16px;">
          <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">Kargo Rotası Girişi</h4>
          <p style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 10px;">Bursa Otogar ➔ Kütahya Terminal</p>
          
          <div style="background: var(--bg-light-gray); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 10px;">
            <div style="width: 40%; height: 100%; background: var(--neon-green);"></div>
          </div>
          
          <span style="font-size: 0.65rem; color: var(--text-muted); display: block;">BEYAN EDİLEN İÇERİK</span>
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-dark);">Kitap ve Kıyafet (2.0 kg)</span>
        </div>
        
        <div style="background: rgba(37, 99, 235, 0.05); border: 1px dashed var(--primary-blue-light); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
          <span style="font-size: 0.65rem; color: var(--text-muted); display: block;">AKILLI BIRAKMA ŞİFRESİ</span>
          <strong style="font-size: 1.4rem; color: var(--primary-blue-light); letter-spacing: 2px; font-weight: 800;">402 918</strong>
          <span style="font-size: 0.6rem; color: var(--text-muted); display: block; margin-top: 4px;">Dolap: Bursa Otogar - Göz B</span>
        </div>

        <button class="btn btn-primary" style="width: 100%; font-size: 0.75rem; padding: 10px;" onclick="setState({currentView: 'auth'})">İlanı Canlı Gör</button>
      </div>
    `;
  } else if (tab === 'carrier') {
    return `
      <div style="text-align: center; padding-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted);">Gezgin Rota Eşleşmesi</span>
          <span style="font-size: 0.65rem; background: rgba(16, 185, 129, 0.1); color: var(--neon-green); padding: 2px 8px; border-radius: 10px; font-weight: 700;">2. Adım</span>
        </div>
        
        <div style="text-align: left; background: #ffffff; border: 1px solid var(--border-light); padding: 12px; border-radius: 12px; margin-bottom: 16px;">
          <span style="font-size: 0.6rem; color: var(--text-muted); font-weight: 700;">UYGUN GÖNDERİ</span>
          <h4 style="font-size: 0.8rem; font-weight: 700; margin-top: 2px;">Ders Notları & Kıyafet</h4>
          <span style="font-size: 0.7rem; color: var(--neon-green); font-weight: 700; display: block; margin-top: 4px;">Kazanç: 115 TL</span>
        </div>
        
        <!-- Yolculuk Çizimi -->
        <div style="border: 1px solid var(--border-light); border-radius: 12px; padding: 10px; background: #fff; margin-bottom: 16px; text-align: left;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.7rem; margin-bottom: 6px;">
            <i data-lucide="truck" style="width: 14px; color: var(--neon-green)"></i>
            <span style="font-weight: 700;">Aktif Taşıma Durumu</span>
          </div>
          <p style="font-size: 0.65rem; color: var(--text-muted)">Dolap A ➔ Yolculuk ➔ Dolap B</p>
        </div>

        <button class="btn btn-secondary" style="width: 100%; font-size: 0.75rem; padding: 10px;" onclick="setState({currentView: 'auth'})">Taşıyıcı Ol</button>
      </div>
    `;
  } else {
    return `
      <div style="text-align: center; padding-top: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted);">Alıcı Bildirimi</span>
          <span style="font-size: 0.65rem; background: rgba(245, 158, 11, 0.1); color: var(--neon-amber); padding: 2px 8px; border-radius: 10px; font-weight: 700;">3. Adım</span>
        </div>
        
        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid var(--neon-green-glow); border-radius: 12px; padding: 12px; margin-bottom: 16px; text-align: left;">
          <p style="font-size: 0.75rem; color: #065f46; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="bell" style="width: 14px; color: var(--neon-green);"></i> Kargonuz Ulaştı!
          </p>
          <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">Paketiniz Kütahya Dolabı Göz 3'te kilitlidir.</p>
        </div>
        
        <div style="background: #ffffff; border: 1px solid var(--border-light); padding: 14px; border-radius: 12px; margin-bottom: 16px;">
          <span style="font-size: 0.65rem; color: var(--text-muted); display: block;">TESLİM ALMA KODUNUZ</span>
          <strong style="font-size: 1.4rem; color: var(--neon-amber); letter-spacing: 2px; font-weight: 800;">509 231</strong>
        </div>

        <button class="btn btn-primary" style="width: 100%; font-size: 0.75rem; padding: 10px;" onclick="setState({currentView: 'auth'})">Üye Girişi Yap</button>
      </div>
    `;
  }
}

// Karusel Slayt Değiştirici
function changeHeroSlide(idx) {
  setState({ activeSlide: idx });
}

// Slaytların otomatik kayması için Zamanlayıcı motoru
let carouselTimer = setInterval(() => {
  if (state.currentView === 'landing') {
    setState(s => {
      s.activeSlide = (s.activeSlide + 1) % 3;
    });
  }
}, 3800);

// Telefon mockup sekmelerinin otomatik olarak sırayla kayması (Canlı Arayüz Efekti)
let mockupTimer = setInterval(() => {
  if (state.currentView === 'landing') {
    setState(s => {
      if (s.phoneMockupTab === 'sender') s.phoneMockupTab = 'carrier';
      else if (s.phoneMockupTab === 'carrier') s.phoneMockupTab = 'receiver';
      else s.phoneMockupTab = 'sender';
    });
  }
}, 4500);

// ----------------------------------------------------
// 2. GİRİŞ VE 3 ADIMLI KYC DOĞRULAMA SAYFASI (LIGHT)
// ----------------------------------------------------
function renderAuthPage() {
  if (state.user && !state.user.kycVerified) {
    return renderKYCStepContent();
  }

  return `
    <div class="auth-container">
      <!-- Sol Taraf: Açık Renkli Çizim Kartı (Muneef Vibe) -->
      <div class="auth-sidebar" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); flex: 1.1;">
        <div style="position: absolute; top: 40px; left: 40px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="package-open" style="color: var(--neon-green); width: 28px; height: 28px;"></i>
          <span style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 800; color: var(--text-dark);">Tashi<span style="color: var(--neon-green)">Go</span></span>
        </div>
        
        <div style="max-width: 480px; text-align: left; padding: 0 20px;">
          <h2 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 16px; font-family: 'Outfit', sans-serif; color: var(--text-dark);">Güvenlik En Yüksek Önceliğimizdir</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
            TashiGo sisteminde anonim hesaplar kesinlikle engellenir. MERNIS API entegrasyonu ile tüm kimlik doğrulamalar resmi olarak gerçekleştirilir.
          </p>
          
          <!-- TashiGo Taşıma İllüstrasyonu (Arayüz Canlandırması) -->
          <div style="text-align: center; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; width: 100%;">
            <div style="background: #ffffff; padding: 15px; border-radius: var(--radius-2xl); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-ambient); max-width: 320px;">
              <img src="carrier_illustration.png" alt="TashiGo P2P Ağı" class="floating-vector-img" style="max-width: 100%; height: auto; max-height: 200px; object-fit: contain;">
            </div>
          </div>
          
          <div style="background: #ffffff; border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-ambient)">
            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
              <i data-lucide="shield-check" style="color: var(--neon-green)"></i>
              <div>
                <h4 style="font-weight: 700; color: var(--text-dark);">%100 Kimlik Onayı</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted)">Resmi nüfus veritabanı üzerinden gerçek kimlik kontrolü.</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <i data-lucide="scan-face" style="color: var(--neon-green)"></i>
              <div>
                <h4 style="font-weight: 700; color: var(--text-dark);">Biyometrik Canlılık Eşleşmesi</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted)">Kimlik kartı görseli ve anlık biyometrik selfie doğrulama eşleşmesi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sağ Taraf: Giriş Formu (Açık Tema) -->
      <div class="auth-main" style="background: #ffffff;">
        <div class="glass-card" style="width: 100%; max-width: 440px; padding: 40px; border-color: var(--border-light);">
          <div style="margin-bottom: 30px; text-align: center;">
            <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">Hesabınızı Oluşturun</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">2 dakikada doğrulanmış profilinizi oluşturun.</p>
          </div>
          
          <form onsubmit="handleInitialRegister(event)">
            <div class="form-group">
              <label>AD SOYAD (KİMLİKTEKİ GİBİ)</label>
              <input type="text" id="reg-name" required placeholder="Örn: Mert Aksoy" class="form-input">
            </div>
            
            <div class="form-group">
              <label>TELEFON NUMARASI</label>
              <input type="tel" id="reg-phone" required placeholder="0532 XXX XX XX" class="form-input">
            </div>
            
            <div class="form-group">
              <label>ŞİFRE</label>
              <input type="password" id="reg-password" required placeholder="••••••••" class="form-input">
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 14px;">
              Kaydol ve KYC Doğrulamaya Başla <i data-lucide="arrow-right"></i>
            </button>
          </form>
          
          <div style="margin-top: 24px; text-align: center; font-size: 0.85rem; color: var(--text-muted);">
            Zaten hesabınız var mı? <a href="#" onclick="handleMockLogin()" style="color: var(--neon-green); font-weight: 700; text-decoration: none;">Doğrulanmış Profille Giriş Yap</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// KYC Sihirbazı Ekran İçeriği (Açık Tema)
function renderKYCStepContent() {
  let innerHtml = '';
  const linePercent = ((state.kycStep - 1) / 2) * 100;
  
  if (state.kycStep === 1) {
    innerHtml = `
      <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 8px;">Adım 1: Telefon Doğrulaması</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 24px;">SMS ile gönderilecek doğrulama kodunu girmek için önce kod talep edin.</p>
      
      <div class="form-group">
        <label>TELEFON NUMARASI</label>
        <div style="display: flex; gap: 10px;">
          <input type="text" readonly value="${state.user.phone}" class="form-input" style="flex: 1; background: var(--bg-light-gray); color: var(--text-muted);">
          <button type="button" class="btn btn-secondary" onclick="sendOtpCode()" ${state.otp.sending ? 'disabled' : ''}>
            ${state.otp.sending ? 'Gönderildi...' : 'Kod Gönder'}
          </button>
        </div>
      </div>
      
      ${state.otp.code ? `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 12px; border-radius: var(--radius-lg); text-align: center; margin-bottom: 20px;">
          <span style="font-size: 0.8rem; color: var(--text-muted)">Simüle Edilen SMS Kodu:</span>
          <strong style="color: #047857; font-size: 1.2rem; letter-spacing: 2px; margin-left: 8px;">${state.otp.code}</strong>
        </div>
        
        <div class="form-group" style="text-align: center;">
          <label>4 HANELİ SMS KODU</label>
          <div class="otp-input-container">
            <input type="text" maxlength="4" id="otp-input-val" class="form-input" style="width: 100px; text-align: center; letter-spacing: 8px; font-size: 1.3rem; font-weight: 700;">
          </div>
        </div>
        
        <button class="btn btn-primary" style="width: 100%;" onclick="verifyOtpCode()">Kodu Doğrula <i data-lucide="arrow-right"></i></button>
      ` : ''}
    `;
  } else if (state.kycStep === 2) {
    innerHtml = `
      <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 8px;">Adım 2: Resmi e-Devlet Sorgusu</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 24px;">Adli makamlarca onaylanmış MERNIS veritabanı eşleştirmesi için bilgileri girin.</p>
      
      <form onsubmit="handleMernisCheck(event)">
        <div class="form-group">
          <label>T.C. KİMLİK NUMARASI</label>
          <input type="text" maxlength="11" id="kyc-tc" required placeholder="11 Haneli T.C. No" class="form-input" pattern="[0-9]{11}">
        </div>
        
        <div class="form-group">
          <label>DOĞUM YILI</label>
          <input type="number" min="1930" max="2010" id="kyc-birth" required placeholder="Örn: 2002" class="form-input">
        </div>
        
        <div id="mernis-loading-box" style="display: none; margin-bottom: 20px;">
          <div class="spinner-container">
            <div class="spinner"></div>
            <span style="font-size: 0.85rem; color: var(--neon-green); font-weight: 600;">MERNIS Sistem Sorgusu Yapılıyor...</span>
          </div>
        </div>
        
        <button type="submit" id="mernis-submit-btn" class="btn btn-primary" style="width: 100%;">MERNIS Veritabanı Sorgula <i data-lucide="database"></i></button>
      </form>
    `;
  } else if (state.kycStep === 3) {
    innerHtml = `
      <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 8px;">Adım 3: Biyometrik Canlılık Testi</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 20px; text-align: center;">Yüzünüzü dairesel çerçevenin ortasına hizalayın ve kamerayı taratın.</p>
      
      <div class="biometric-scanner-viewport" id="bio-viewport">
        <div class="biometric-scanner-line"></div>
        <i data-lucide="user" id="bio-user-icon" style="width: 80px; height: 80px; color: var(--text-muted)"></i>
        <div id="bio-scan-avatar" style="display: none; width: 100%; height: 100%; background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(30, 58, 138, 0.4) 100%); display: none; align-items: center; justify-content: center; font-size: 4rem;">👤</div>
      </div>
      
      <div id="bio-loading-text" style="text-align: center; display: none; margin-bottom: 16px;">
        <span style="font-size: 0.9rem; color: #047857; font-weight: 700; animation: pulse 1.5s infinite">Tarama ve Biyometrik Eşleştirme Yapılıyor...</span>
      </div>
      
      <button class="btn btn-primary" id="bio-scan-btn" style="width: 100%;" onclick="runBiometricScan()">Selfie Tara ve Eşleştir <i data-lucide="scan-face"></i></button>
    `;
  }

  return `
    <div class="auth-container">
      <div class="auth-sidebar" style="background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%); flex: 0.8;">
        <div style="position: absolute; top: 40px; left: 40px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="package-open" style="color: var(--neon-green); width: 28px; height: 28px;"></i>
          <span style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 800; color: var(--text-dark);">Tashi<span style="color: var(--neon-green)">Go</span></span>
        </div>
        <div style="max-width: 400px; text-align: left; color: var(--text-dark);">
          <h2 style="font-size: 1.8rem; margin-bottom: 12px; font-family: 'Outfit', sans-serif; font-weight: 800;">Erişim Bariyeri</h2>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 20px;">Platform güvenliği için, işlem yapmaya başlamadan önce kimliğinizin e-Devlet ve Biyometrik vizör üzerinden doğrulanması zorunludur.</p>
          
          <!-- TashiGo Taşıma İllüstrasyonu (Arayüz Canlandırması) -->
          <div style="text-align: center; display: flex; align-items: center; justify-content: center; width: 100%;">
            <div style="background: #ffffff; padding: 15px; border-radius: var(--radius-2xl); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-ambient); max-width: 320px;">
              <img src="carrier_illustration.png" alt="TashiGo P2P Ağı" class="floating-vector-img" style="max-width: 100%; height: auto; max-height: 180px; object-fit: contain;">
            </div>
          </div>
        </div>
      </div>
      
      <div class="auth-main" style="flex: 1.2; background: #ffffff;">
        <div class="glass-card kyc-wizard" style="border-color: var(--border-light);">
          <div class="kyc-step-indicators">
            <div class="kyc-step-line-fill" style="width: ${linePercent}%;"></div>
            <div class="kyc-indicator ${state.kycStep >= 1 ? (state.kycStep > 1 ? 'completed' : 'active') : ''}">1</div>
            <div class="kyc-indicator ${state.kycStep >= 2 ? (state.kycStep > 2 ? 'completed' : 'active') : ''}">2</div>
            <div class="kyc-indicator ${state.kycStep >= 3 ? (state.kycStep > 3 ? 'completed' : 'active') : ''}">3</div>
          </div>
          
          ${innerHtml}
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// OTP AKSİYONLARI
// ----------------------------------------------------
function sendOtpCode() {
  setState(s => {
    s.otp.sending = true;
  });
  
  setTimeout(() => {
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
    setState(s => {
      s.otp.sending = false;
      s.otp.code = generatedCode;
    });
    showToast(`SMS kodu başarıyla gönderildi: ${generatedCode}`);
  }, 1000);
}

function verifyOtpCode() {
  const input = document.getElementById('otp-input-val').value;
  if (input === state.otp.code) {
    showToast("Telefon numarası doğrulandı. T.C. Kimlik doğrulama aşamasına geçiliyor.");
    setState(s => {
      s.kycStep = 2;
      s.otp.code = '';
    });
  } else {
    showToast("Geçersiz veya hatalı OTP kodu girdiniz!", false);
  }
}

// ----------------------------------------------------
// MERNIS SORGULAMA AKSİYONLARI
// ----------------------------------------------------
function handleMernisCheck(e) {
  e.preventDefault();
  const tc = document.getElementById('kyc-tc').value;
  const birth = document.getElementById('kyc-birth').value;
  
  document.getElementById('mernis-loading-box').style.display = 'block';
  document.getElementById('mernis-submit-btn').setAttribute('disabled', 'true');
  
  setTimeout(() => {
    setState(s => {
      s.user.tc = tc;
      s.user.birthYear = birth;
      s.kycStep = 3;
    });
    showToast("MERNIS Sorgusu Başarılı! T.C. Vatandaşlık kaydı onaylandı.");
  }, 1800);
}

// ----------------------------------------------------
// BİYOMETRİK YÜZ TARAMA AKSİYONLARI
// ----------------------------------------------------
function runBiometricScan() {
  const viewPort = document.getElementById('bio-viewport');
  const userIcon = document.getElementById('bio-user-icon');
  const scanBtn = document.getElementById('bio-scan-btn');
  const loadingText = document.getElementById('bio-loading-text');
  
  viewPort.classList.add('scanning');
  if (userIcon) userIcon.style.display = 'none';
  
  const avatar = document.getElementById('bio-scan-avatar');
  if (avatar) avatar.style.display = 'flex';
  
  scanBtn.setAttribute('disabled', 'true');
  loadingText.style.display = 'block';
  
  setTimeout(() => {
    const timestamp = new Date().toLocaleString();
    setState(s => {
      s.user.kycVerified = true;
      s.user.verifiedAt = timestamp;
      s.currentView = 'dashboard';
      s.dashboardSubView = 'overview';
    });
    showToast("Biyometrik tarama eşleşti! Profiliniz Güvenle Doğrulandı.");
  }, 3000);
}

// ----------------------------------------------------
// TEST HESAP GİRİŞİ (HIZLI GEÇİŞ)
// ----------------------------------------------------
function handleMockLogin() {
  const timestamp = new Date().toLocaleString();
  setState(s => {
    s.user = {
      name: 'Mert Aksoy (Test)',
      phone: '0532 987 65 43',
      tc: '38192019482',
      birthYear: '1998',
      kycStep: 3,
      kycVerified: true,
      score: 5.0,
      verifiedAt: timestamp
    };
    s.currentView = 'dashboard';
    s.dashboardSubView = 'overview';
  });
  showToast("Doğrulanmış test profili ile giriş yapıldı.");
}

// ----------------------------------------------------
// 3. YÖNETİM PANELİ (DASHBOARD LAYOUT & SUB-VIEWS)
// ----------------------------------------------------
function renderDashboardLayout(contentHtml) {
  return `
    <div class="dashboard-container">
      <!-- Sidebar (Açık Renkli Muneef Esintisi & Collapsible) -->
      <aside class="sidebar ${state.sidebarCollapsed ? 'collapsed' : ''}">
        <div class="logo-container" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; width: 100%;">
          <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" class="logo-wrapper" onclick="setState({currentView: 'landing'})">
            <div style="background: var(--text-dark); padding: 8px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--neon-green); flex-shrink: 0;">
              <i data-lucide="package-open" style="color: var(--neon-green); width: 20px; height: 20px;"></i>
            </div>
            <span class="logo-text" style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--text-dark);">Tashi<span style="color: var(--neon-green)">Go</span></span>
          </div>
          <button class="sidebar-toggle-btn" onclick="toggleSidebar()">
            <i data-lucide="${state.sidebarCollapsed ? 'chevron-right' : 'chevron-left'}"></i>
          </button>
        </div>
        
        <!-- Navigasyon Menüsü -->
        <nav class="nav-menu">
          <div class="nav-item ${state.dashboardSubView === 'overview' ? 'active' : ''}" onclick="setState({dashboardSubView: 'overview'})">
            <i data-lucide="layout-dashboard"></i> <span class="nav-text">Panel Özeti</span>
          </div>
          <div class="nav-item ${state.dashboardSubView === 'sender' ? 'active' : ''}" onclick="setState({dashboardSubView: 'sender'})">
            <i data-lucide="send"></i> <span class="nav-text">Gönderici Paneli</span>
          </div>
          <div class="nav-item ${state.dashboardSubView === 'carrier' ? 'active' : ''}" onclick="setState({dashboardSubView: 'carrier'})">
            <i data-lucide="truck"></i> <span class="nav-text">Taşıyıcı Paneli</span>
          </div>
          <div class="nav-item ${state.dashboardSubView === 'receiver' ? 'active' : ''}" onclick="setState({dashboardSubView: 'receiver'})">
            <i data-lucide="package-check"></i> <span class="nav-text">Alıcı Paneli</span>
          </div>
          <div class="nav-item ${state.dashboardSubView === 'lockers' ? 'active' : ''}" onclick="setState({dashboardSubView: 'lockers'})">
            <i data-lucide="map-pin"></i> <span class="nav-text">Akıllı Dolap Haritası</span>
          </div>
          <div class="nav-item ${state.dashboardSubView === 'profile' ? 'active' : ''}" onclick="setState({dashboardSubView: 'profile'})">
            <i data-lucide="shield-alert"></i> <span class="nav-text">Doğrulanmış Profil</span>
          </div>
          <div class="nav-item ${state.dashboardSubView === 'feedback' ? 'active' : ''}" onclick="setState({dashboardSubView: 'feedback'})">
            <i data-lucide="message-square"></i> <span class="nav-text">Sistem Geri Bildirimi</span>
          </div>
        </nav>
        
        <!-- Alt Çıkış Düğmesi -->
        <div style="margin-top: auto; border-top: 1px solid var(--border-light); padding-top: 20px; width: 100%;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <div style="background: rgba(16, 185, 129, 0.1); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #047857; font-weight: 800; flex-shrink: 0;">
              ${getUserScore(state.user.name).toFixed(1)}
            </div>
            <div class="profile-details">
              <p style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark); white-space: nowrap;">${state.user.name}</p>
              <p style="font-size: 0.75rem; color: var(--text-muted)">Skor: ${getUserScore(state.user.name).toFixed(1)} ★</p>
            </div>
          </div>
          <button class="btn btn-outline" style="width: 100%; font-size: 0.8rem; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="setState({user: null, currentView: 'landing'})">
            <i data-lucide="log-out"></i> <span class="btn-exit-text">Güvenli Çıkış Yap</span>
          </button>
        </div>
      </aside>
      
      <!-- Ana Panel Alanı (Açık Gri Arkaplan) -->
      <main class="main-content">
        <!-- Üst Bar: Rol Değiştirici -->
        <div class="dashboard-header">
          <div>
            <h1 style="font-size: 2rem; font-weight: 800; font-family: 'Outfit', sans-serif;">
              ${getDashboardTitle()}
            </h1>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Temassız ve güvenli kargo ekosistemi simülatörü</p>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="role-switcher-container">
              <button class="role-btn ${state.activeRole === 'sender' ? 'active' : ''}" data-role="sender" onclick="setState({activeRole: 'sender', dashboardSubView: 'sender'})">Gönderici</button>
              <button class="role-btn ${state.activeRole === 'carrier' ? 'active' : ''}" data-role="carrier" onclick="setState({activeRole: 'carrier', dashboardSubView: 'carrier'})">Taşıyıcı</button>
              <button class="role-btn ${state.activeRole === 'receiver' ? 'active' : ''}" data-role="receiver" onclick="setState({activeRole: 'receiver', dashboardSubView: 'receiver'})">Alıcı</button>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid var(--neon-green-glow); border-radius: var(--radius-xl); padding: 8px 16px; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.85rem; color: #047857; font-weight: 700;">KYC Doğrulandı</span>
              <i data-lucide="shield-check" style="color: var(--neon-green); width: 18px; height: 18px;"></i>
            </div>
          </div>
        </div>
        
        <!-- Sayfa İçeriği -->
        ${contentHtml}
      </main>
    </div>
  `;
}

function getDashboardTitle() {
  if (state.dashboardSubView === 'overview') return 'TashiGo Kontrol Merkezi';
  if (state.dashboardSubView === 'sender') return 'Gönderici (Kargoyu Veren) Paneli';
  if (state.dashboardSubView === 'carrier') return 'Taşıyıcı (Kargoyu Alan) Paneli';
  if (state.dashboardSubView === 'receiver') return 'Alıcı Kontrol Paneli';
  if (state.dashboardSubView === 'lockers') return 'Locker Hub - Akıllı Dolap Bulucu';
  if (state.dashboardSubView === 'profile') return 'Resmi Kimlik & Yasal Zırh Verileri';
  if (state.dashboardSubView === 'feedback') return 'Geri Bildirim Kontrol Paneli';
  return 'Kontrol Paneli';
}

function renderDashboardContent() {
  if (state.dashboardSubView === 'overview') return renderSubViewOverview();
  if (state.dashboardSubView === 'sender') return renderSubViewSender();
  if (state.dashboardSubView === 'carrier') return renderSubViewCarrier();
  if (state.dashboardSubView === 'receiver') return renderSubViewReceiver();
  if (state.dashboardSubView === 'lockers') return renderSubViewLockers();
  if (state.dashboardSubView === 'profile') return renderSubViewProfile();
  if (state.dashboardSubView === 'feedback') return renderSubViewFeedback();
}

// ----------------------------------------------------
// A. PANEL ÖZETİ (SUB-VIEW: OVERVIEW)
// ----------------------------------------------------
function renderSubViewOverview() {
  const activeCargoCount = state.cargos.filter(c => c.status !== 'DELIVERED').length;
  const totalCarrierEarnings = state.cargos
    .filter(c => c.carrier !== null)
    .reduce((acc, c) => acc + parseInt(c.price), 0);

  return `
    <!-- İstatistik Kartları (Bütünsel Tasarım) -->
    <div class="stats-summary-card">
      <div class="stat-item">
        <span class="stat-item-label">Aktif Kargolar</span>
        <div class="stat-item-value blue">${activeCargoCount} Adet</div>
      </div>
      <div class="stat-item">
        <span class="stat-item-label">Gezgin Kazanç Havuzu</span>
        <div class="stat-item-value green">${totalCarrierEarnings} TL</div>
      </div>
      <div class="stat-item">
        <span class="stat-item-label">Doğrulanmış Üye Skoru</span>
        <div class="stat-item-value amber">${getUserScore(state.user.name).toFixed(1)} ★</div>
      </div>
      <div class="stat-item">
        <span class="stat-item-label">Aktif Dolap Gözü</span>
        <div class="stat-item-value green">24 Boş Göz</div>
      </div>
    </div>
    
    <!-- Simülatör Hızlı Başlangıç -->
    <div class="glass-card" style="margin-bottom: 40px; border-left: 4px solid var(--neon-green)">
      <h3 style="margin-bottom: 12px; font-weight: 800; color: var(--text-dark);">💡 TashiGo Simülatörü Nasıl Deneyimlenir?</h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">
        TashiGo, gönderici, taşıyıcı ve alıcının yüz yüze gelmeden dolaplar üzerinden yaptığı kargo transferini canlandırır.
        Süreçleri izlemek için sağ üstteki <strong>Gönderici, Taşıyıcı, Alıcı</strong> rolleri arasında geçiş yapabilirsiniz.
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="setState({dashboardSubView: 'sender', activeRole: 'sender'})">Gönderici Formunu Aç</button>
        <button class="btn btn-secondary" onclick="setState({dashboardSubView: 'lockers'})">Locker Hub Haritasını Gör</button>
      </div>
    </div>

    <!-- Aktif Kargo Listesi Tablosu -->
    <div class="glass-card">
      <h3 style="margin-bottom: 20px; font-weight: 800; color: var(--text-dark);">Sistemdeki Aktif Kargo Transferleri</h3>
      
      ${state.cargos.length === 0 ? `
        <div style="text-align: center; padding: 40px; color: var(--text-muted)">Sistemde henüz aktif kargo bulunmuyor.</div>
      ` : `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.85rem;">
                <th style="padding: 12px;">Gönderi ID</th>
                <th style="padding: 12px;">Güzergah</th>
                <th style="padding: 12px;">İçerik</th>
                <th style="padding: 12px;">Durum</th>
                <th style="padding: 12px;">Dinamik Ücret</th>
                <th style="padding: 12px;">İşlem</th>
              </tr>
            </thead>
            <tbody>
              ${state.cargos.map(cargo => `
                <tr style="border-bottom: 1px solid var(--border-light); font-size: 0.9rem;">
                  <td style="padding: 16px; font-weight: 800; color: var(--primary-blue-light)">#${cargo.id.toUpperCase()}</td>
                  <td style="padding: 16px; font-weight: 600;">${cargo.origin} ➔ ${cargo.destination}</td>
                  <td style="padding: 16px; color: var(--text-muted);">${cargo.desc}</td>
                  <td style="padding: 16px;">
                    <span style="background: ${getStatusColor(cargo.status).bg}; color: ${getStatusColor(cargo.status).text}; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">
                      ${getStatusLabel(cargo.status)}
                    </span>
                  </td>
                  <td style="padding: 16px; font-weight: 800; color: #047857;">${cargo.price}</td>
                  <td style="padding: 16px;">
                    <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="goToRoleFlow('${cargo.id}', '${cargo.status}')">
                      Takip Et <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// Statü Renkleri (Açık Tema Uyumluluğu)
function getStatusColor(status) {
  switch (status) {
    case 'AWAITING_LOCKER_A': return { bg: 'rgba(37, 99, 235, 0.08)', text: '#1d4ed8' };
    case 'SECURED_IN_LOCKER_A': return { bg: 'rgba(245, 158, 11, 0.08)', text: '#b45309' };
    case 'IN_TRANSIT': return { bg: 'rgba(139, 92, 246, 0.08)', text: '#6d28d9' };
    case 'SECURED_IN_LOCKER_B': return { bg: 'rgba(16, 185, 129, 0.08)', text: '#047857' };
    case 'DELIVERED': return { bg: 'rgba(100, 116, 139, 0.08)', text: '#475569' };
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'AWAITING_LOCKER_A': return 'A Dolabına Bırakılacak';
    case 'SECURED_IN_LOCKER_A': return 'Şehir A Dolabında Güvende';
    case 'IN_TRANSIT': return 'Taşıyıcıda (Yolda)';
    case 'SECURED_IN_LOCKER_B': return 'Şehir B Dolabında (Alıcı Bekleniyor)';
    case 'DELIVERED': return 'Teslim Edildi';
  }
}

function goToRoleFlow(cargoId, status) {
  if (status === 'AWAITING_LOCKER_A' || status === 'SECURED_IN_LOCKER_A') {
    setState({ dashboardSubView: 'sender', activeRole: 'sender' });
  } else if (status === 'IN_TRANSIT') {
    setState({ dashboardSubView: 'carrier', activeRole: 'carrier' });
  } else {
    setState({ dashboardSubView: 'receiver', activeRole: 'receiver' });
  }
}

// ----------------------------------------------------
// B. GÖNDERİCİ PANELİ (SUB-VIEW: SENDER)
// ----------------------------------------------------
function renderSubViewSender() {
  const currentSenderCargo = state.cargos.find(c => c.sender === state.user.name || c.id === 'c1');
  
  const mySentCargos = state.cargos.filter(c => c.sender === state.user.name);
  const pendingRatings = mySentCargos.filter(c => {
    if (c.status !== 'DELIVERED') return false;
    if (!c.carrier) return false;
    const ratingExists = state.ratings.some(r => r.cargoId === c.id && r.role === 'sender_to_carrier');
    return !ratingExists;
  });

  let pendingRatingsHtml = '';
  if (pendingRatings.length > 0) {
    pendingRatingsHtml = `
      <div class="glass-card" style="border-left: 4px solid var(--neon-amber); margin-bottom: 24px; padding: 20px;">
        <h4 style="font-weight: 800; margin-bottom: 8px; color: var(--text-dark); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="award" style="color: var(--neon-amber)"></i> Değerlendirme Bekleyen Gezginler
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px;">Teslimatı tamamlanan paketleriniz için gezginleri değerlendirin:</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${pendingRatings.map(c => `
            <div style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-xl); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 0.85rem; color: var(--text-dark);">${c.desc}</strong>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Gezgin: ${c.carrier} | Güzergah: ${c.origin} ➔ ${c.destination}</p>
              </div>
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px;" onclick="openBidirectionalRatingModal('${c.id}', '${state.user.name}', '${c.carrier}', 'sender_to_carrier')">
                Puanla <i data-lucide="chevron-right"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  return `
    <div class="two-col-grid">
      
      <!-- Sol Panel: İlan & Form Oluşturma -->
      <div class="glass-card">
        <h3 style="font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--text-dark);">
          <i data-lucide="plus-circle" style="color: var(--neon-green)"></i> Yeni Kargo İlanı Oluştur
        </h3>
        
        <form onsubmit="handleCreateCargo(event)">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label>ÇIKIŞ ŞEHRİ</label>
              <select id="cargo-origin" class="form-input" onchange="calculateDynamicPrice()">
                ${state.cities.map(c => `<option value="${c}" ${state.tempSenderCargo.origin === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label>VARIŞ ŞEHRİ</label>
              <select id="cargo-destination" class="form-input" onchange="calculateDynamicPrice()">
                ${state.cities.map(c => `<option value="${c}" ${state.tempSenderCargo.destination === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label>PAKET İÇERİK BEYANI (YASAL TAAHHÜTLÜ)</label>
            <input type="text" id="cargo-desc" required placeholder="Örn: Kitap, hırka ve spor ayakkabı" class="form-input">
          </div>
          
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px;">
            <div class="form-group">
              <label>KABİN BOYUTU (DESİ)</label>
              <select id="cargo-size" class="form-input" onchange="calculateDynamicPrice()">
                <option value="Küçük">Küçük Göz (Zarf, Cüzdan)</option>
                <option value="Orta" selected>Orta Göz (Kitap, Kıyafet, Koli)</option>
                <option value="Büyük">Büyük Göz (Sırt Çantası, Koli)</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>PAKET AĞIRLIĞI</label>
              <input type="text" id="cargo-weight" value="2.0 kg" class="form-input">
            </div>
          </div>
 
          <!-- Paket Fotoğrafı -->
          <div class="form-group">
            <label>PAKET DIŞ FOTOĞRAFI (ZORUNLU)</label>
            <div style="display: flex; gap: 12px; align-items: center;">
              <div style="width: 70px; height: 60px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light)">
                <img src="${state.tempSenderCargo.photo}" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <button type="button" class="btn btn-outline" style="font-size: 0.8rem; padding: 8px 16px;" onclick="simulatePhotoUpload()">
                <i data-lucide="camera"></i> Fotoğraf Yükle
              </button>
            </div>
          </div>
 
          <!-- Yasal Onay -->
          <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: flex-start;">
            <input type="checkbox" id="cargo-legal-agree" required style="margin-top: 4px;">
            <label for="cargo-legal-agree" style="font-size: 0.8rem; color: var(--text-muted); cursor: pointer; line-height: 1.4;">
              Gönderilen paketin yasal mevzuata uygun olduğunu, içeriğinde yasadışı veya tehlikeli madde bulunmadığını kabul ve taahhüt ederim.
            </label>
          </div>
          
          <!-- Fiyatlama Kutusu (Martı Tipi Dinamik) -->
          <div style="background: rgba(16, 185, 129, 0.04); border: 1px solid rgba(16, 185, 129, 0.15); padding: 16px; border-radius: var(--radius-xl); margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Hesaplanan Dinamik Ücret:</span>
              <strong id="dynamic-price-tag" style="font-size: 1.35rem; color: #047857;">115 TL</strong>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 10px;">
              <span>Arz/Talep: Normal</span> | <span>Kabin Katsayısı: Orta (1.25x)</span>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
            İlanı Kaydet ve Dolap Kilitle <i data-lucide="arrow-right"></i>
          </button>
        </form>
      </div>
      
      <!-- Sağ Panel: Mevcut Kargo Durumu & Dolap Simülatörü -->
      <div class="flow-container">
        ${pendingRatingsHtml}
        <div class="glass-card">
          <h3 style="font-weight: 800; margin-bottom: 16px; color: var(--text-dark);">Gönderilen Paket Durumu</h3>
          
          ${!currentSenderCargo ? `
            <div style="text-align: center; padding: 40px; color: var(--text-muted)">Henüz aktif kargonuz bulunmamaktadır. Soldaki formu doldurarak kargo gönderin.</div>
          ` : `
            <div>
              <div style="display: flex; gap: 16px; margin-bottom: 20px;">
                <img src="${currentSenderCargo.photo}" style="width: 80px; height: 80px; border-radius: var(--radius-xl); object-fit: cover; border: 1px solid var(--border-light)">
                <div>
                  <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-dark);">${currentSenderCargo.desc}</h4>
                  <p style="font-size: 0.85rem; color: var(--text-muted)">Güzergah: ${currentSenderCargo.origin} ➔ ${currentSenderCargo.destination}</p>
                  <p style="font-size: 0.85rem; color: var(--text-muted)">Atanan İstasyon: <strong style="color: var(--text-dark);">${currentSenderCargo.originStation}</strong></p>
                </div>
              </div>

              <!-- Şifre Kartı -->
              <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-light-gray); padding: 16px; border-radius: var(--radius-xl); border: 1px solid var(--border-light);">
                <div>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">DOLAP BIRAKMA ŞİFRESİ</span>
                  <div style="font-size: 1.8rem; font-weight: 800; letter-spacing: 2px; color: var(--primary-blue-light); margin-top: 4px;">${currentSenderCargo.dropPin.slice(0,3)} ${currentSenderCargo.dropPin.slice(3)}</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">DOLAP GÖZÜ</span>
                  <div style="font-size: 0.95rem; font-weight: 800; color: #047857; margin-top: 4px;">Dolap #08 - Göz B</div>
                </div>
              </div>
              
              <!-- Dolap Bırakma Düğmesi -->
              ${currentSenderCargo.status === 'AWAITING_LOCKER_A' ? `
                <div style="margin-top: 24px;">
                  <button class="btn btn-secondary" style="width: 100%;" onclick="openLockerSim('${currentSenderCargo.id}', '${currentSenderCargo.dropPin}', 'sender_drop')">
                    Sanal Akıllı Dolap Terminalini Aç <i data-lucide="tablet"></i>
                  </button>
                </div>
              ` : `
                <div style="margin-top: 24px; padding: 14px; background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.15); border-radius: var(--radius-xl); text-align: center;">
                  <span style="font-size: 0.85rem; color: #047857; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i data-lucide="check-circle"></i> Paket Dolaba Kilitlendi! Sistem Güvencesinde.
                  </span>
                </div>
              `}
            </div>
          `}
        </div>

        <!-- Zaman Tüneli -->
        ${currentSenderCargo ? `
          <div class="glass-card">
            <h4 style="font-weight: 800; margin-bottom: 12px; color: var(--text-dark);">Kargo Yolculuk Durumu</h4>
            <div class="cargo-status-timeline">
              <div class="timeline-progress-bar" style="width: ${getTimelineProgressWidth(currentSenderCargo.status)}%; height: ${getTimelineProgressWidth(currentSenderCargo.status)}%;"></div>
              
              <div class="timeline-node ${currentSenderCargo.status !== 'AWAITING_LOCKER_A' ? 'completed' : 'active'}">
                <div class="timeline-node-dot">1</div>
                <span>Hazırlandı</span>
              </div>
              
              <div class="timeline-node ${currentSenderCargo.status === 'SECURED_IN_LOCKER_A' ? 'active' : (currentSenderCargo.status !== 'AWAITING_LOCKER_A' && currentSenderCargo.status !== 'SECURED_IN_LOCKER_A' ? 'completed' : '')}">
                <div class="timeline-node-dot">2</div>
                <span>A Dolabında</span>
              </div>
              
              <div class="timeline-node ${currentSenderCargo.status === 'IN_TRANSIT' ? 'active' : (currentSenderCargo.status === 'SECURED_IN_LOCKER_B' || currentSenderCargo.status === 'DELIVERED' ? 'completed' : '')}">
                <div class="timeline-node-dot">3</div>
                <span>Yolda</span>
              </div>
              
              <div class="timeline-node ${currentSenderCargo.status === 'SECURED_IN_LOCKER_B' ? 'active' : (currentSenderCargo.status === 'DELIVERED' ? 'completed' : '')}">
                <div class="timeline-node-dot">4</div>
                <span>B Dolabında</span>
              </div>
              
              <div class="timeline-node ${currentSenderCargo.status === 'DELIVERED' ? 'completed' : ''}">
                <div class="timeline-node-dot">5</div>
                <span>Teslim Edildi</span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Dinamik Fiyat Hesaplayıcı
function calculateDynamicPrice() {
  const origin = document.getElementById('cargo-origin').value;
  const destination = document.getElementById('cargo-destination').value;
  const size = document.getElementById('cargo-size').value;
  
  let basePrice = 60;
  if (origin !== destination) basePrice = 90;
  
  let sizeMult = 1.0;
  if (size === 'Orta') sizeMult = 1.25;
  if (size === 'Büyük') sizeMult = 1.6;
  
  const demandMult = 1.05;
  const finalPrice = Math.round(basePrice * sizeMult * demandMult);
  document.getElementById('dynamic-price-tag').innerText = `${finalPrice} TL`;
}

// Görsel Yükleme Simülasyonu
function simulatePhotoUpload() {
  const mockImages = [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80'
  ];
  
  const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
  setState(s => {
    s.tempSenderCargo.photo = randomImg;
  });
  showToast("Fotoğraf güncellendi.");
}

// Kargo İlanı Oluşturma Aksiyonu
function handleCreateCargo(e) {
  e.preventDefault();
  
  const origin = document.getElementById('cargo-origin').value;
  const dest = document.getElementById('cargo-destination').value;
  const desc = document.getElementById('cargo-desc').value;
  const size = document.getElementById('cargo-size').value;
  const weight = document.getElementById('cargo-weight').value;
  const price = document.getElementById('dynamic-price-tag').innerText;
  
  const dropPin = Math.floor(100000 + Math.random() * 900000).toString();
  const extractPin = Math.floor(100000 + Math.random() * 900000).toString();
  
  const newCargo = {
    id: 'c' + (state.cargos.length + 1),
    sender: state.user.name,
    phone: state.user.phone,
    origin: origin,
    destination: dest,
    desc: desc,
    photo: state.tempSenderCargo.photo,
    size: size,
    weight: weight,
    status: 'AWAITING_LOCKER_A',
    dropPin: dropPin,
    extractPin: extractPin,
    originStation: origin + ' Otogar Merkez Dolabı',
    destStation: dest + ' Otogar Gel-Al Dolabı',
    carrier: null,
    carrierRating: 0,
    price: price,
    createdAt: new Date().toLocaleString()
  };
  
  const stationKey = origin.toLowerCase()
    .replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g').replace('ö', 'o').replace('ü', 'u');
  
  setState(s => {
    s.cargos.push(newCargo);
    if (s.stations[stationKey]) {
      const emptySlot = s.stations[stationKey].slots.find(sl => sl.status === 'empty' && sl.size === size);
      if (emptySlot) {
        emptySlot.status = 'occupied';
        emptySlot.detail = `${desc} (${weight})`;
      }
    }
  });
  
  showToast("Kargo ilanı oluşturuldu! Dolap atandı.");
}

// ----------------------------------------------------
// C. TAŞIYICI PANELİ (SUB-VIEW: CARRIER)
// ----------------------------------------------------
function renderSubViewCarrier() {
  const availableCargos = state.cargos.filter(c => c.status === 'SECURED_IN_LOCKER_A' && c.carrier === null);
  const myCarryingCargos = state.cargos.filter(c => c.carrier === state.user.name && c.status !== 'DELIVERED');
  
  const myAllCarryingCargos = state.cargos.filter(c => c.carrier === state.user.name);
  const pendingSenderRatings = myAllCarryingCargos.filter(c => {
    if (c.status === 'AWAITING_LOCKER_A' || c.status === 'SECURED_IN_LOCKER_A') return false;
    const ratingExists = state.ratings.some(r => r.cargoId === c.id && r.role === 'carrier_to_sender');
    return !ratingExists;
  });

  const pendingReceiverRatings = myAllCarryingCargos.filter(c => {
    if (c.status !== 'DELIVERED') return false;
    const ratingExists = state.ratings.some(r => r.cargoId === c.id && r.role === 'carrier_to_receiver');
    return !ratingExists;
  });

  let pendingCarrierRatingsHtml = '';
  if (pendingSenderRatings.length > 0 || pendingReceiverRatings.length > 0) {
    pendingCarrierRatingsHtml = `
      <div class="glass-card" style="border-left: 4px solid var(--neon-amber); margin-bottom: 24px; padding: 20px;">
        <h4 style="font-weight: 800; margin-bottom: 8px; color: var(--text-dark); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="award" style="color: var(--neon-amber)"></i> Değerlendirme Bekleyen Süreçler
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px;">Süreç ortaklarınızı puanlayarak topluluk güvenliğine katkıda bulunun:</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${pendingSenderRatings.map(c => `
            <div style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-xl); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 0.85rem; color: var(--text-dark);">${c.desc} (Gönderen)</strong>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Gönderici: ${c.sender} | Durum: Paketi Teslim Aldınız</p>
              </div>
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px;" onclick="openBidirectionalRatingModal('${c.id}', '${state.user.name}', '${c.sender}', 'carrier_to_sender')">
                Göndericiyi Puanla <i data-lucide="chevron-right"></i>
              </button>
            </div>
          `).join('')}
          ${pendingReceiverRatings.map(c => `
            <div style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-xl); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 0.85rem; color: var(--text-dark);">${c.desc} (Alıcı)</strong>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Alıcı: Mehmet Kaya | Durum: Paket Teslim Edildi</p>
              </div>
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px;" onclick="openBidirectionalRatingModal('${c.id}', '${state.user.name}', 'Mehmet Kaya', 'carrier_to_receiver')">
                Alıcıyı Puanla <i data-lucide="chevron-right"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="two-col-grid">
      
      <!-- Sol Panel: Rota & Eşleşen Kargolar Listesi -->
      <div class="glass-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="font-weight: 800; display: flex; align-items: center; gap: 10px; color: var(--text-dark);">
            <i data-lucide="compass" style="color: var(--neon-green);"></i> Ulaşım Rota Filtresi
          </h3>
          <span style="font-size: 0.8rem; background: rgba(37, 99, 235, 0.08); padding: 4px 12px; border-radius: 20px; color: var(--primary-blue-light); font-weight: 700;">
            TAG Puanlama Aktif
          </span>
        </div>
        
        <div style="display: flex; gap: 16px; margin-bottom: 30px; background: var(--bg-light-gray); padding: 16px; border-radius: var(--radius-xl); border: 1px solid var(--border-light);">
          <div style="flex: 1;">
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">NEREDEN</label>
            <select id="carrier-filter-origin" class="form-input" style="padding: 8px 12px;">
              <option value="Bursa">Bursa</option>
              <option value="İstanbul">İstanbul</option>
            </select>
          </div>
          
          <div style="display: flex; align-items: center; padding-top: 15px;">
            <i data-lucide="arrow-right-left" style="color: var(--text-muted)"></i>
          </div>
          
          <div style="flex: 1;">
            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 6px;">NEREYE</label>
            <select id="carrier-filter-dest" class="form-input" style="padding: 8px 12px;">
              <option value="Kütahya">Kütahya</option>
              <option value="Ankara">Ankara</option>
            </select>
          </div>
        </div>

        <h4 style="font-weight: 800; margin-bottom: 16px; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Rotadaki Uygun İlanlar</h4>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${availableCargos.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: var(--text-muted); border: 1px dashed var(--border-light); border-radius: var(--radius-xl);">
              Belirttiğiniz rotada şu anda taşınmayı bekleyen kargo bulunmamaktadır.
            </div>
          ` : `
            ${availableCargos.map(cargo => `
              <div class="matching-card glass-card" style="padding: 20px; display: flex; justify-content: space-between; align-items: center; border-radius: var(--radius-xl);">
                <div>
                  <h4 style="font-weight: 800; color: var(--text-dark);">${cargo.desc}</h4>
                  <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px; margin-bottom: 6px; flex-wrap: wrap;">
                    <span class="match-badge">
                      <i data-lucide="shield-check" style="width: 12px; height: 12px; margin-right: 3px;"></i>
                      %${getMatchPercentage(cargo.sender)} Güvenli Eşleşme
                    </span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">
                      Gönderici: <strong>${cargo.sender}</strong> (${getUserScore(cargo.sender).toFixed(1)} ★)
                    </span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Alım: <strong>${cargo.originStation}</strong></p>
                  <p style="font-size: 0.8rem; color: var(--text-muted)">Boyut: ${cargo.size} | Ağırlık: ${cargo.weight}</p>
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
                  <strong style="color: #047857; font-size: 1.2rem; font-weight: 800;">${cargo.price}</strong>
                  <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem;" onclick="inspectCarrierMatch('${cargo.id}')">
                    İncele & Taşı
                  </button>
                </div>
              </div>
            `).join('')}
          `}
        </div>
      </div>
      
      <!-- Sağ Panel: Üzerimdeki Taşımalar & Dolap Şifreleri -->
      <div class="flow-container">
        ${pendingCarrierRatingsHtml}
        <div class="glass-card">
          <h3 style="font-weight: 800; margin-bottom: 20px; color: var(--text-dark);">Üzerimdeki Taşımalar</h3>
          
          ${myCarryingCargos.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: var(--text-muted)">Şu anda taşımakta olduğunuz aktif bir kargo yoktur.</div>
          ` : `
            ${myCarryingCargos.map(cargo => `
              <div style="padding-bottom: 20px; border-bottom: 1px solid var(--border-light); margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                  <div>
                    <h4 style="font-weight: 800; color: var(--text-dark);">#${cargo.id.toUpperCase()} - ${cargo.desc}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted)">Durum: 
                      <strong style="color: var(--neon-green)">
                        ${cargo.status === 'SECURED_IN_LOCKER_A' ? 'A Dolabından Alınacak' : 'Taşıma Halinde'}
                      </strong>
                    </p>
                  </div>
                  <strong style="color: #047857; font-weight: 800;">${cargo.price}</strong>
                </div>

                ${cargo.status === 'SECURED_IN_LOCKER_A' ? `
                  <div style="background: rgba(37, 99, 235, 0.04); border: 1px solid rgba(37, 99, 235, 0.15); padding: 14px; border-radius: var(--radius-xl); margin-top: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">ALIM DOLAP ŞİFRESİ (ŞEHİR A)</span>
                    </div>
                    <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary-blue-light); letter-spacing: 2px;">
                      ${cargo.dropPin.slice(0,3)} ${cargo.dropPin.slice(3)}
                    </div>
                    <button class="btn btn-secondary" style="width: 100%; margin-top: 10px; font-size: 0.8rem; padding: 8px;" onclick="openLockerSim('${cargo.id}', '${cargo.dropPin}', 'carrier_pickup')">
                      A Dolabını Aç & Teslim Al
                    </button>
                  </div>
                ` : ''}

                ${cargo.status === 'IN_TRANSIT' ? `
                  <div style="background: rgba(16, 185, 129, 0.04); border: 1px solid rgba(16, 185, 129, 0.15); padding: 14px; border-radius: var(--radius-xl); margin-top: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">BIRAKMA DOLAP ŞİFRESİ (ŞEHİR B)</span>
                    </div>
                    <div style="font-size: 1.4rem; font-weight: 800; color: #047857; letter-spacing: 2px;">
                      ${cargo.dropPin.slice(0,3)} ${cargo.dropPin.slice(3)}
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 10px; font-size: 0.8rem; padding: 8px;" onclick="openLockerSim('${cargo.id}', '${cargo.dropPin}', 'carrier_drop')">
                      B Dolabını Aç & Kilitle
                    </button>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          `}
        </div>
      </div>
    </div>

    <!-- Eşleşme İnceleme Modalı -->
    ${state.tempCarrierMatch ? renderCarrierMatchModal() : ''}
  `;
}

function renderCarrierMatchModal() {
  const cargo = state.tempCarrierMatch;
  return `
    <div class="modal-overlay active">
      <div class="glass-card modal-content" style="max-width: 550px; border-color: var(--border-light);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-weight: 800; color: var(--text-dark);">Kargo Detayı & Sorumluluk</h3>
          <button style="background: transparent; border: none; color: var(--text-dark); cursor: pointer;" onclick="setState({tempCarrierMatch: null})">
            <i data-lucide="x"></i>
          </button>
        </div>
        
        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <img src="${cargo.photo}" style="width: 90px; height: 90px; border-radius: var(--radius-xl); object-fit: cover; border: 1px solid var(--border-light)">
          <div>
            <h4 style="font-weight: 700; font-size: 1.15rem; color: var(--text-dark);">${cargo.desc}</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted)">Rotası: ${cargo.origin} ➔ ${cargo.destination}</p>
            <p style="font-size: 0.85rem; color: var(--text-muted)">İstasyonlar: ${cargo.originStation} ➔ ${cargo.destStation}</p>
            <p style="font-size: 0.85rem; color: var(--text-muted)">Boyut: ${cargo.size} | Ağırlık: ${cargo.weight}</p>
          </div>
        </div>

        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); padding: 16px; border-radius: var(--radius-xl); margin-bottom: 20px;">
          <h5 style="color: var(--neon-red); font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="shield-alert" style="width: 16px; height: 16px;"></i> Güvenlik Taahhüdü
          </h5>
          <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">
            Dolap kapağını açtığınızda paketin dış bütünlüğünü inceleyin. Yasadışı veya şüpheli içerik taşıdığını düşünüyorsanız paketi almayın ve sistem üzerinden bildirim yapın.
          </p>
        </div>

        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: flex-start;">
          <input type="checkbox" id="carrier-legal-check" style="margin-top: 4px;">
          <label for="carrier-legal-check" style="font-size: 0.8rem; color: var(--text-muted); cursor: pointer; line-height: 1.4;">
            Kargoyu hasarsız teslim alacağımı, beyan dışı içerik taşınmasından sorumlu olmadığımı beyan ve taahhüt ederim.
          </label>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-outline" onclick="setState({tempCarrierMatch: null})">İptal Et</button>
          <button class="btn btn-primary" onclick="acceptCarrierMatch('${cargo.id}')">Kabul Et ve Taşı</button>
        </div>
      </div>
    </div>
  `;
}

function inspectCarrierMatch(cargoId) {
  const cargo = state.cargos.find(c => c.id === cargoId);
  setState({ tempCarrierMatch: cargo });
}

function acceptCarrierMatch(cargoId) {
  const isChecked = document.getElementById('carrier-legal-check').checked;
  if (!isChecked) {
    showToast("Devam etmek için yasal taahhüdü onaylamanız gerekir!", false);
    return;
  }

  setState(s => {
    const cargo = s.cargos.find(c => c.id === cargoId);
    if (cargo) {
      cargo.carrier = s.user.name;
    }
    s.tempCarrierMatch = null;
  });

  showToast("Gönderi kabul edildi! A dolabına giderek teslim alabilirsiniz.");
}

// ----------------------------------------------------
// D. ALICI PANELİ (SUB-VIEW: RECEIVER)
// ----------------------------------------------------
function renderSubViewReceiver() {
  const myReceivedCargos = state.cargos.filter(c => c.receiver === 'Mehmet Kaya' || c.sender !== state.user.name);
  
  const pendingReceiverRatings = myReceivedCargos.filter(c => {
    if (c.status !== 'DELIVERED') return false;
    if (!c.carrier) return false;
    const ratingExists = state.ratings.some(r => r.cargoId === c.id && r.role === 'receiver_to_carrier');
    return !ratingExists;
  });

  let pendingReceiverRatingsHtml = '';
  if (pendingReceiverRatings.length > 0) {
    pendingReceiverRatingsHtml = `
      <div class="glass-card" style="border-left: 4px solid var(--neon-amber); margin-bottom: 24px; padding: 20px;">
        <h4 style="font-weight: 800; margin-bottom: 8px; color: var(--text-dark); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="award" style="color: var(--neon-amber)"></i> Değerlendirme Bekleyen Gezginler
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px;">Teslim aldığınız paketleriniz için gezginleri değerlendirin:</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${pendingReceiverRatings.map(c => `
            <div style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-xl); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 0.85rem; color: var(--text-dark);">${c.desc}</strong>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Gezgin: ${c.carrier} | Teslim İstasyonu: ${c.destStation}</p>
              </div>
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 8px;" onclick="openBidirectionalRatingModal('${c.id}', 'Mehmet Kaya', '${c.carrier}', 'receiver_to_carrier')">
                Puanla <i data-lucide="chevron-right"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="two-col-grid">
      
      <!-- Sol Panel: Bekleyen Paketlerim ve Teslim Şifreleri -->
      <div class="glass-card">
        <h3 style="font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--text-dark);">
          <i data-lucide="package" style="color: var(--neon-amber)"></i> Bana Gelen Kargo İlanları
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${myReceivedCargos.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: var(--text-muted)">Bekleyen kargonuz bulunmuyor.</div>
          ` : `
            ${myReceivedCargos.map(cargo => `
              <div style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 18px; border-radius: var(--radius-xl);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                  <div>
                    <h4 style="font-weight: 800; color: var(--text-dark);">${cargo.desc}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted)">Gönderen: ${cargo.sender}</p>
                    <p style="font-size: 0.85rem; color: var(--text-muted)">Hedef Dolap: <strong>${cargo.destStation}</strong></p>
                  </div>
                  <span style="background: ${getStatusColor(cargo.status).bg}; color: ${getStatusColor(cargo.status).text}; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">
                    ${getStatusLabel(cargo.status)}
                  </span>
                </div>

                ${cargo.status === 'SECURED_IN_LOCKER_B' ? `
                  <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.15); padding: 16px; border-radius: var(--radius-lg); margin-top: 14px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">TESLİM ALIM ŞİFRESİ (ŞEHİR B)</span>
                    </div>
                    <div style="font-size: 1.5rem; font-weight: 800; letter-spacing: 2px; color: var(--neon-amber); margin-bottom: 12px;">
                      ${cargo.extractPin.slice(0,3)} ${cargo.extractPin.slice(3)}
                    </div>
                    <button class="btn btn-secondary" style="width: 100%; font-size: 0.85rem;" onclick="openLockerSim('${cargo.id}', '${cargo.extractPin}', 'receiver_pickup')">
                      Dolaba Git ve Şifre Gir <i data-lucide="tablet"></i>
                    </button>
                  </div>
                ` : ''}

                ${cargo.status === 'DELIVERED' ? `
                  <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.15); padding: 12px; border-radius: var(--radius-lg); text-align: center; margin-top: 10px; color: #047857; font-size: 0.85rem; font-weight: 700;">
                    Kargo Başarıyla Teslim Alındı.
                  </div>
                ` : ''}
              </div>
            `).join('')}
          `}
        </div>
      </div>
      
      <!-- Sağ Panel: Güvenlik / Teslim Koşulları -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${pendingReceiverRatingsHtml}
        <div class="glass-card">
          <h3 style="font-weight: 800; margin-bottom: 16px; color: var(--text-dark);">Güvenli Teslimat Protokolü</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
            Alıcı, paketi ancak kendisine iletilen 6 haneli özel şifreyle teslim alabilir. Bu şifre sisteme girilmedikçe kapak kesinlikle açılmaz.
          </p>
          
          <div style="background: var(--bg-light-gray); padding: 16px; border-radius: var(--radius-xl); display: flex; flex-direction: column; gap: 12px; border: 1px solid var(--border-light)">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <i data-lucide="key" style="color: var(--neon-green)"></i>
              <p style="font-size: 0.8rem; color: var(--text-muted);"><strong style="color: var(--text-dark);">Tek Kullanımlık Şifre:</strong> Her kapak açımı adli olarak loglanır.</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <i data-lucide="clock" style="color: var(--neon-green)"></i>
              <p style="font-size: 0.8rem; color: var(--text-muted);"><strong style="color: var(--text-dark);">48 Saat Sınırı:</strong> Bırakılan paketlerin 48 saat içinde teslim alınması önerilir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// E. DOLAP ENVENTARİ & HARİTA (SUB-VIEW: LOCKERS)
// ----------------------------------------------------
// Şehir isimlerinden rotaları eşleme yardımcı fonksiyonu
function getRouteId(cityA, cityB) {
  const c1 = cityA.toLowerCase().replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u');
  const c2 = cityB.toLowerCase().replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u');
  const sorted = [c1, c2].sort();
  return `route-${sorted[0]}-${sorted[1]}`;
}

function renderSubViewLockers() {
  const currentHub = state.stations[state.selectedHubId];
  
  // Bulunan aktif taşıma rotası
  const activeCargo = state.cargos.find(c => c.status !== 'DELIVERED');
  const activeRouteId = activeCargo ? getRouteId(activeCargo.origin, activeCargo.destination) : null;
  
  // Seçili hub'a bağlı yolları belirleme fonksiyonu
  const isRouteConnected = (city) => {
    return city.toLowerCase() === state.selectedHubId;
  };
  
  const getRouteClass = (cityA, cityB) => {
    const routeId = getRouteId(cityA, cityB);
    if (routeId === activeRouteId) return 'map-route-line active';
    if (isRouteConnected(cityA) || isRouteConnected(cityB)) return 'map-route-line connected';
    return 'map-route-line';
  };
  
  const getSlotIcon = (size) => {
    if (size === 'Küçük') return 'mail';
    if (size === 'Orta') return 'package';
    return 'archive';
  };
  
  return `
    <div class="map-explorer-layout">
      <!-- Sol Panel: Etkileşimli Türkiye Bölgesel SVG Haritası -->
      <div class="glass-card map-card">
        <h3 style="font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; color: var(--text-dark);">
          <i data-lucide="map" style="color: var(--neon-green)"></i> Akıllı Dolap Bulucu Haritası
        </h3>
        
        <div class="svg-map-wrapper">
          <svg viewBox="0 0 800 400" class="svg-map-element">
            <!-- Arka Plan Grid Yapısı -->
            <g stroke="rgba(148, 163, 184, 0.07)" stroke-width="1" stroke-dasharray="2 4" fill="none">
              <line x1="0" y1="100" x2="800" y2="100" />
              <line x1="0" y1="200" x2="800" y2="200" />
              <line x1="0" y1="300" x2="800" y2="300" />
              <line x1="200" y1="0" x2="200" y2="400" />
              <line x1="400" y1="0" x2="400" y2="400" />
              <line x1="600" y1="0" x2="600" y2="400" />
            </g>
            <g fill="rgba(148, 163, 184, 0.5)" font-size="8" font-family="monospace">
              <text x="5" y="98">41° N</text>
              <text x="5" y="198">40° N</text>
              <text x="5" y="298">39° N</text>
              <text x="195" y="12" text-anchor="middle">28° E</text>
              <text x="395" y="12" text-anchor="middle">30° E</text>
              <text x="595" y="12" text-anchor="middle">32° E</text>
            </g>
            
            <!-- Detaylı Türkiye Batı Kıyı Şeridi & Kara Yapısı -->
            <path d="M 50,80
                     C 80,75 110,70 140,85
                     C 150,90 160,95 170,95
                     C 180,95 190,85 195,80
                     C 198,75 196,70 197,65
                     L 197,90
                     C 197,95 195,98 193,100
                     C 185,105 170,105 160,110
                     C 150,115 140,112 130,120
                     C 120,128 115,135 118,140
                     C 120,145 130,148 135,150
                     C 145,155 165,155 175,150
                     C 190,142 205,140 220,142
                     C 235,145 250,150 260,155
                     C 265,158 270,165 260,170
                     C 245,178 230,175 220,185
                     C 210,195 200,200 185,195
                     C 170,190 155,180 145,185
                     C 135,190 130,200 125,205
                     C 120,210 115,200 110,200
                     C 105,200 102,210 105,215
                     C 110,225 120,230 115,240
                     C 110,250 95,255 100,265
                     C 105,275 120,270 125,280
                     C 128,288 120,295 122,300
                     C 125,305 135,300 140,305
                     C 145,310 140,320 145,325
                     C 150,330 160,325 165,335
                     C 170,345 160,355 170,360
                     C 180,365 190,360 200,365
                     L 790,365 L 790,45 L 205,45 Z" 
                  class="svg-map-path" />
            
            <!-- Detaylı Yol Rotaları (Dinamik Neon Hatlar) -->
            <g class="map-routes">
              <path id="route-istanbul-bursa" d="M 200 100 Q 210 135 240 170" class="${getRouteClass('İstanbul', 'Bursa')}" />
              <path id="route-bursa-kutahya" d="M 240 170 L 310 210" class="${getRouteClass('Bursa', 'Kütahya')}" />
              <path id="route-kutahya-izmir" d="M 310 210 Q 220 230 130 270" class="${getRouteClass('Kütahya', 'İzmir')}" />
              <path id="route-istanbul-ankara" d="M 200 100 Q 380 120 550 190" class="${getRouteClass('İstanbul', 'Ankara')}" />
              <path id="route-bursa-ankara" d="M 240 170 Q 395 170 550 190" class="${getRouteClass('Bursa', 'Ankara')}" />
              <path id="route-kutahya-ankara" d="M 310 210 L 550 190" class="${getRouteClass('Kütahya', 'Ankara')}" />
              <path id="route-izmir-ankara" d="M 130 270 Q 340 240 550 190" class="${getRouteClass('İzmir', 'Ankara')}" />
              <path id="route-istanbul-izmir" d="M 200 100 Q 150 180 130 270" class="${getRouteClass('İstanbul', 'İzmir')}" />
              <path id="route-bursa-izmir" d="M 240 170 Q 185 220 130 270" class="${getRouteClass('Bursa', 'İzmir')}" />
              <path id="route-istanbul-kutahya" d="M 200 100 Q 255 155 310 210" class="${getRouteClass('İstanbul', 'Kütahya')}" />
            </g>
            
            <!-- İSTANBUL PIN (cx="200", cy="100") -->
            <g class="map-marker ${state.selectedHubId === 'istanbul' ? 'selected' : ''}" onclick="selectLockerHub('istanbul')">
              <circle cx="200" cy="100" r="12" class="map-marker-pulse" />
              <circle cx="200" cy="100" r="6" />
              <text x="200" y="82" text-anchor="middle">İstanbul Hub</text>
            </g>

            <!-- BURSA PIN (cx="240", cy="170") -->
            <g class="map-marker ${state.selectedHubId === 'bursa' ? 'selected' : ''}" onclick="selectLockerHub('bursa')">
              <circle cx="240" cy="170" r="12" class="map-marker-pulse" />
              <circle cx="240" cy="170" r="6" />
              <text x="240" y="152" text-anchor="middle">Bursa Hub</text>
            </g>

            <!-- KÜTAHYA PIN (cx="310", cy="210") -->
            <g class="map-marker ${state.selectedHubId === 'kutahya' ? 'selected' : ''}" onclick="selectLockerHub('kutahya')">
              <circle cx="310" cy="210" r="12" class="map-marker-pulse" />
              <circle cx="310" cy="210" r="6" />
              <text x="310" y="192" text-anchor="middle">Kütahya Hub</text>
            </g>

            <!-- ANKARA PIN (cx="550", cy="190") -->
            <g class="map-marker ${state.selectedHubId === 'ankara' ? 'selected' : ''}" onclick="selectLockerHub('ankara')">
              <circle cx="550" cy="190" r="12" class="map-marker-pulse" />
              <circle cx="550" cy="190" r="6" />
              <text x="550" y="172" text-anchor="middle">Ankara Hub</text>
            </g>

            <!-- İZMİR PIN (cx="130", cy="270") -->
            <g class="map-marker ${state.selectedHubId === 'izmir' ? 'selected' : ''}" onclick="selectLockerHub('izmir')">
              <circle cx="130" cy="270" r="12" class="map-marker-pulse" />
              <circle cx="130" cy="270" r="6" />
              <text x="130" y="252" text-anchor="middle">İzmir Hub</text>
            </g>
            
            <!-- Pusula Gülü (Compass Rose) -->
            <g transform="translate(740, 80)" stroke="rgba(15, 23, 42, 0.3)" stroke-width="1" fill="none">
              <circle cx="0" cy="0" r="22" stroke-dasharray="1 3" />
              <line x1="-28" y1="0" x2="28" y2="0" />
              <line x1="0" y1="-28" x2="0" y2="28" />
              <polygon points="0,-25 4,-6 0,0" fill="var(--primary-blue-light)" stroke="none" />
              <polygon points="0,-25 -4,-6 0,0" fill="var(--text-muted)" stroke="none" />
              <polygon points="0,25 4,6 0,0" fill="var(--text-muted)" stroke="none" />
              <polygon points="0,25 -4,6 0,0" fill="var(--text-muted)" stroke="none" />
              <text x="0" y="-31" text-anchor="middle" fill="var(--text-dark)" font-size="8" font-weight="800" stroke="none">N</text>
            </g>
            
            <!-- Ölçek Çubuğu (Scale Bar) -->
            <g transform="translate(40, 360)">
              <rect x="0" y="0" width="80" height="3" fill="var(--text-dark)" />
              <rect x="80" y="0" width="80" height="3" fill="#ffffff" stroke="var(--text-dark)" stroke-width="1" />
              <text x="0" y="-6" fill="var(--text-muted)" font-size="8" font-family="monospace">0</text>
              <text x="80" y="-6" fill="var(--text-muted)" font-size="8" text-anchor="middle" font-family="monospace">50 km</text>
              <text x="160" y="-6" fill="var(--text-muted)" font-size="8" text-anchor="end" font-family="monospace">100 km</text>
            </g>
          </svg>
        </div>
      </div>
      
      <!-- Sağ Panel: Canlı Envanter ve GPS Konum Verileri -->
      <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <h3 style="font-weight: 800; margin-bottom: 4px; color: var(--neon-green)">Kabin Durumu & Canlı GPS</h3>
          <p style="font-size: 0.95rem; color: var(--text-dark); font-weight: 700; margin-top: 6px;">${currentHub.name}</p>
          <p style="font-size: 0.8rem; color: var(--text-muted);">${currentHub.address}</p>
          
          <!-- Konum Bilgileri & GPS Koordinatları Bölümü (İstenen Özellik) -->
          <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            <div class="gps-info-badge">
              <i data-lucide="navigation" style="width: 14px; height: 14px;"></i> GPS: ${currentHub.gps}
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px; font-size: 0.75rem;">
              <div style="background: var(--bg-light-gray); padding: 8px; border-radius: 8px; border: 1px solid var(--border-light);">
                <span style="color: var(--text-muted); display: block;">SICAKLIK</span>
                <strong style="color: var(--text-dark);">${currentHub.temp}</strong>
              </div>
              <div style="background: var(--bg-light-gray); padding: 8px; border-radius: 8px; border: 1px solid var(--border-light);">
                <span style="color: var(--text-muted); display: block;">GECİKME (PING)</span>
                <strong style="color: var(--text-dark);">${currentHub.ping}</strong>
              </div>
            </div>
            
            <div style="font-size: 0.75rem; color: var(--text-muted); background: var(--bg-light-gray); padding: 8px; border-radius: 8px; border: 1px solid var(--border-light); display: flex; justify-content: space-between;">
              <span>Bağlantı Türü:</span>
              <strong style="color: #047857;">${currentHub.connection}</strong>
            </div>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem;">
              <span style="font-weight: 700;">Göz Doluluk Detayı</span>
              <span style="color: var(--text-muted)">Toplam: ${currentHub.slots.length} Göz</span>
            </div>
            
            <div class="locker-grid">
              ${currentHub.slots.map(slot => `
                <div class="locker-box ${slot.status}" onclick="showLockerSlotDetail(${slot.id}, '${slot.size}', '${slot.status}', '${slot.detail || ''}')">
                  <div class="locker-led"></div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 8px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-dark);">#${slot.id}</span>
                    <i data-lucide="${getSlotIcon(slot.size)}" style="width: 15px; height: 15px; color: var(--text-muted);"></i>
                  </div>
                  
                  <div style="margin-top: auto; text-align: left;">
                    <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-dark); margin-bottom: 6px;">${slot.size} Göz</div>
                    <span class="locker-badge ${slot.status === 'empty' ? 'empty-badge' : 'occupied-badge'}">
                      ${slot.status === 'empty' ? 'BOŞ' : 'DOLU'}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 16px; border-radius: var(--radius-xl); margin-top: 24px;" id="slot-detail-pane">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px;">KABİN DETAYI</span>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Göz detaylarını ve kilit durumunu incelemek için yukarıdaki gözlerden birine tıklayın.</p>
        </div>
      </div>
    </div>
  `;
}

function selectLockerHub(hubId) {
  setState({ selectedHubId: hubId });
}

function showLockerSlotDetail(slotId, size, status, detail) {
  const pane = document.getElementById('slot-detail-pane');
  if (!pane) return;
  
  if (status === 'empty') {
    pane.innerHTML = `
      <span style="font-size: 0.75rem; color: #047857; font-weight: 800; display: block; margin-bottom: 4px;">GÖZ #${slotId} (BOŞ)</span>
      <p style="font-size: 0.85rem; color: var(--text-dark);">Bu göz rezervasyona ve paket kilitlenmesine hazırdır.</p>
      <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 6px;">Boyut Sınıfı: ${size}</span>
    `;
  } else {
    pane.innerHTML = `
      <span style="font-size: 0.75rem; color: #b91c1c; font-weight: 800; display: block; margin-bottom: 4px;">GÖZ #${slotId} (KİLİTLİ / DOLU)</span>
      <p style="font-size: 0.85rem; color: var(--text-dark);"><strong style="color: var(--text-muted)">Paket Beyanı:</strong> ${detail}</p>
      <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 6px;">Durum: Kamera vizörü tarafından kilit koruması devrede.</span>
    `;
  }
}

// ----------------------------------------------------
// F. PROFİL / YASAL BİLGİLER
// ----------------------------------------------------
function renderSubViewProfile() {
  return `
    <div class="two-col-grid">
      <div class="glass-card">
        <h3 style="font-weight: 800; margin-bottom: 24px;">Doğrulanmış Üye Kartı</h3>
        
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 30px;">
          <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-blue), var(--neon-green)); border: 3px solid var(--neon-green); display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 16px; box-shadow: var(--shadow-ambient);">
            👤
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--text-dark);">${state.user.name}</h4>
          <span style="background: rgba(16, 185, 129, 0.08); color: #047857; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; border: 1px solid var(--neon-green-glow); margin-top: 8px;">
            Resmi Kimlik Doğrulandı
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; border-top: 1px solid var(--border-light); padding-top: 20px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-muted)">T.C. Kimlik No:</span>
            <span style="color: var(--text-dark); font-weight: 700;">********${state.user.tc.slice(-3)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-muted)">Telefon Numarası:</span>
            <span style="color: var(--text-dark); font-weight: 700;">${state.user.phone}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-muted)">Biyometrik Damga:</span>
            <span style="color: var(--text-dark); font-weight: 700;">${state.user.verifiedAt}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-muted)">Gezgin Puanı:</span>
            <span style="color: var(--neon-green); font-weight: 800;">${state.user.score.toFixed(1)} ★</span>
          </div>
        </div>
      </div>
      
      <div class="glass-card" style="border-color: var(--neon-red)">
        <h3 style="font-weight: 800; margin-bottom: 16px; color: var(--neon-red); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="shield-alert"></i> Yasal Sorumluluk & Log Paylaşım Beyanı
        </h3>
        
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">
          TashiGo, hukuki olarak 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun kapsamında bir <strong>"Aracı Hizmet Sağlayıcı"</strong> ve 5651 sayılı kanun uyarınca bir <strong>"Yer Sağlayıcı"</strong>dır.
        </p>

        <div style="background: rgba(239, 68, 68, 0.04); border: 1px solid rgba(239, 68, 68, 0.15); padding: 18px; border-radius: var(--radius-xl); margin-bottom: 20px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-dark); margin-bottom: 8px;">Adli Makamlara Doğrudan Bilgi Transferi</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
            Taşınan paketlerin içerisinden çıkabilecek her türlü yasadışı maddeden, içeriği beyan eden Gönderici ve teslim alırken kontrol yükümlülüğünü yerine getiren Taşıyıcı sorumludur.
            Şüpheli bir durum halinde veya adli soruşturmalarda; doğrulanmış e-Devlet (MERNIS) verileri, telefon bilgileri ve biyometrik selfie zaman damgaları <strong>doğrudan Cumhuriyet Başsavcılıkları ile paylaşılacaktır.</strong>
          </p>
        </div>

        <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(37, 99, 235, 0.05); padding: 14px; border-radius: var(--radius-lg); border: 1px solid rgba(37, 99, 235, 0.15);">
          <i data-lucide="database" style="color: var(--neon-green)"></i>
          <p style="font-size: 0.75rem; color: var(--text-muted);">
            Tüm dolap açılış logları, şifre denemeleri ve işlemler askeri düzeyde şifrelenerek saklanır.
          </p>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// DIGIKALA ESİNTİLİ SPATIAL SPATIAL LOCKER TERMINAL MODALI
// ----------------------------------------------------
function renderVirtualLockerModal() {
  const vl = state.virtualLocker;
  return `
    <div class="glass-card modal-content spatial-locker-modal" style="max-width: 400px; padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h4 style="font-weight: 800; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="tablet-pc" style="color: var(--neon-green)"></i> Dolap Terminali (Simüle)
        </h4>
        <button style="background: transparent; border: none; color: #fff; cursor: pointer;" onclick="closeLockerSim()">
          <i data-lucide="x"></i>
        </button>
      </div>

      <!-- 3D Koli Kutu Görseli (Digikala esintisi) -->
      <div style="height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
        <div class="package-3d-box">
          <div class="package-3d-face"></div>
          <div class="package-3d-face package-3d-top"></div>
          <div class="package-3d-face package-3d-side"></div>
        </div>
      </div>

      <div class="virtual-locker-terminal" style="padding: 20px; border-radius: 20px;">
        <!-- Dolap Ekranı -->
        <div class="virtual-locker-screen" style="border-radius: 10px; padding: 15px; height: 110px; font-family: monospace; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 0.75rem; letter-spacing: 1px;">TASHIGO SECURE SYSTEM</div>
          <div style="font-size: 1.15rem; text-align: center; color: ${vl.screenMsg.includes('HATALI') ? 'var(--neon-red)' : 'var(--neon-green)'}; font-weight: 700;">
            ${vl.screenMsg}
          </div>
          <div style="text-align: right; font-size: 0.65rem; color: #6b7280;">KAPAK DETAYI: KİLİTLİ</div>
        </div>

        <!-- Tuş Takımı -->
        <div class="virtual-locker-keys" style="margin-top: 20px;">
          <button class="locker-key" onclick="pressLockerKey('1')">1</button>
          <button class="locker-key" onclick="pressLockerKey('2')">2</button>
          <button class="locker-key" onclick="pressLockerKey('3')">3</button>
          <button class="locker-key" onclick="pressLockerKey('4')">4</button>
          <button class="locker-key" onclick="pressLockerKey('5')">5</button>
          <button class="locker-key" onclick="pressLockerKey('6')">6</button>
          <button class="locker-key" onclick="pressLockerKey('7')">7</button>
          <button class="locker-key" onclick="pressLockerKey('8')">8</button>
          <button class="locker-key" onclick="pressLockerKey('9')">9</button>
          <button class="locker-key" style="background: var(--neon-red);" onclick="pressLockerKey('C')">C</button>
          <button class="locker-key" onclick="pressLockerKey('0')">0</button>
          <button class="locker-key" style="background: var(--neon-green); color: #0b0f19;" onclick="pressLockerKey('E')">GİRİŞ</button>
        </div>
      </div>
      
      <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: var(--radius-lg); text-align: center; margin-top: 15px; border: 1px solid var(--spatial-border)">
        <span style="font-size: 0.75rem; color: var(--spatial-text-muted);">Sistem Şifresi:</span>
        <strong style="color: var(--neon-green); font-size: 1rem; margin-left: 6px; letter-spacing: 1px;">${vl.expectedPin}</strong>
      </div>
    </div>
  `;
}

function openLockerSim(cargoId, expectedPin, actionType) {
  setState(s => {
    s.virtualLocker.active = true;
    s.virtualLocker.cargoId = cargoId;
    s.virtualLocker.expectedPin = expectedPin;
    s.virtualLocker.actionType = actionType;
    s.virtualLocker.inputPin = '';
    s.virtualLocker.screenMsg = 'Lütfen 6 Haneli Şifrenizi Girin...';
  });
}

function closeLockerSim() {
  setState(s => {
    s.virtualLocker.active = false;
  });
}

function pressLockerKey(key) {
  let vl = state.virtualLocker;
  
  if (key === 'C') {
    setState(s => {
      s.virtualLocker.inputPin = '';
      s.virtualLocker.screenMsg = 'Lütfen Şifre Girin...';
    });
  } else if (key === 'E') {
    if (vl.inputPin === vl.expectedPin) {
      handleLockerActionSuccess();
    } else {
      setState(s => {
        s.virtualLocker.inputPin = '';
        s.virtualLocker.screenMsg = 'ŞİFRE HATALI!';
      });
      setTimeout(() => {
        setState(s => {
          s.virtualLocker.screenMsg = 'Lütfen 6 Haneli Şifreyi Girin...';
        });
      }, 1500);
    }
  } else {
    if (vl.inputPin.length < 6) {
      setState(s => {
        s.virtualLocker.inputPin += key;
        s.virtualLocker.screenMsg = s.virtualLocker.inputPin;
      });
    }
  }
}

function handleLockerActionSuccess() {
  const type = state.virtualLocker.actionType;
  const cargoId = state.virtualLocker.cargoId;
  
  setState(s => {
    const cargo = s.cargos.find(c => c.id === cargoId);
    if (cargo) {
      if (type === 'sender_drop') {
        cargo.status = 'SECURED_IN_LOCKER_A';
        s.virtualLocker.screenMsg = 'KAPAK AÇILDI! PAKETİ KOYUNUZ.';
      } else if (type === 'carrier_pickup') {
        cargo.status = 'IN_TRANSIT';
        s.virtualLocker.screenMsg = 'KAPAK AÇILDI! PAKETİ ALINIZ.';
      } else if (type === 'carrier_drop') {
        cargo.status = 'SECURED_IN_LOCKER_B';
        s.virtualLocker.screenMsg = 'KAPAK AÇILDI! PAKETİ BIRAKINIZ.';
      } else if (type === 'receiver_pickup') {
        cargo.status = 'DELIVERED';
        s.virtualLocker.screenMsg = 'KAPAK AÇILDI! PAKETİ TESLİM ALIN.';
      }
    }
  });

  setTimeout(() => {
    setState(s => {
      s.virtualLocker.active = false;
    });
    
    const cargo = state.cargos.find(c => c.id === cargoId);
    
    if (type === 'sender_drop') {
      showToast("Kargo dolaba bırakıldı! Taşıyıcı bekleniyor.");
    } else if (type === 'carrier_pickup') {
      showToast("Paketi teslim aldınız. Yolculuk başladı!");
      setTimeout(() => {
        if (cargo) {
          openBidirectionalRatingModal(cargoId, state.user.name, cargo.sender, 'carrier_to_sender');
        }
      }, 500);
    } else if (type === 'carrier_drop') {
      showToast("Kargo B dolabına kilitlendi. Taşıyıcı görevi tamamlandı.");
    } else if (type === 'receiver_pickup') {
      showToast("Kargoyu teslim aldınız! Süreç tamamlandı.");
      setTimeout(() => {
        if (cargo) {
          openBidirectionalRatingModal(cargoId, 'Mehmet Kaya', cargo.carrier || 'Mert Aksoy', 'receiver_to_carrier');
        }
      }, 500);
    }
  }, 2000);
}

// ----------------------------------------------------
// GERİ BİLDİRİM VE ÇİFT TARAFLI PUANLAMA MODÜLLERİ
// ----------------------------------------------------

function renderSubViewFeedback() {
  return `
    <div class="two-col-grid">
      <!-- Sol Panel: Yeni Geri Bildirim Formu -->
      <div class="glass-card">
        <h3 style="font-weight: 800; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; color: var(--text-dark);">
          <i data-lucide="message-square" style="color: var(--neon-green)"></i> Geri Bildiriminiz Bizim İçin Değerli
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px;">
          Sistemimizi geliştirmek ve size daha iyi bir deneyim sunmak için görüş, öneri ve hata bildirimlerinizi bizimle paylaşın.
        </p>
        
        <form onsubmit="handleCreateFeedback(event)">
          <div class="form-group">
            <label>KONU BAŞLIĞI</label>
            <input type="text" id="fb-subject" required placeholder="Örn: Akıllı dolap ekran tepkisi" class="form-input">
          </div>
          
          <div class="form-group">
            <label>GERİ BİLDİRİM TÜRÜ</label>
            <div class="feedback-type-container">
              <input type="hidden" id="fb-type" value="suggest">
              <button type="button" class="feedback-type-btn active" data-type="suggest" onclick="selectFeedbackType('suggest')">Öneri</button>
              <button type="button" class="feedback-type-btn" data-type="bug" onclick="selectFeedbackType('bug')">Hata Bildirimi</button>
              <button type="button" class="feedback-type-btn" data-type="support" onclick="selectFeedbackType('support')">Destek</button>
              <button type="button" class="feedback-type-btn" data-type="happy" onclick="selectFeedbackType('happy')">Memnuniyet</button>
            </div>
          </div>
          
          <div class="form-group">
            <label>SİSTEM PUANI</label>
            <div class="star-rating" style="justify-content: flex-start; margin-bottom: 10px;" id="fb-star-rating">
              <input type="hidden" id="fb-rating" value="5">
              <i data-lucide="star" class="active" data-index="1" onclick="setFeedbackStarRating(1)"></i>
              <i data-lucide="star" class="active" data-index="2" onclick="setFeedbackStarRating(2)"></i>
              <i data-lucide="star" class="active" data-index="3" onclick="setFeedbackStarRating(3)"></i>
              <i data-lucide="star" class="active" data-index="4" onclick="setFeedbackStarRating(4)"></i>
              <i data-lucide="star" class="active" data-index="5" onclick="setFeedbackStarRating(5)"></i>
            </div>
          </div>
          
          <div class="form-group">
            <label>DETAYLI AÇIKLAMA</label>
            <textarea id="fb-comment" required placeholder="Geri bildiriminizi buraya yazın..." class="form-input" style="height: 120px; resize: none;"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
            Geri Bildirimi Gönder <i data-lucide="send"></i>
          </button>
        </form>
      </div>
      
      <!-- Sağ Panel: Geçmiş Geri Bildirimler -->
      <div class="glass-card" style="display: flex; flex-direction: column; max-height: 600px; overflow-y: auto;">
        <h3 style="font-weight: 800; margin-bottom: 20px; color: var(--text-dark);">Önceki Geri Bildirimler</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${state.feedbacks.map(fb => `
            <div class="review-comment-box" style="background: var(--bg-light-gray); border: 1px solid var(--border-light); padding: 16px; border-radius: var(--radius-xl);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-dark);">${fb.subject}</h4>
                  <span style="font-size: 0.7rem; font-weight: 700; color: #fff; background: ${getFeedbackTypeColor(fb.type)}; padding: 2px 8px; border-radius: 20px; display: inline-block; margin-top: 4px;">
                    ${getFeedbackTypeLabel(fb.type)}
                  </span>
                </div>
                <div style="color: var(--neon-amber); display: flex; align-items: center; gap: 2px; font-size: 0.85rem; font-weight: 700;">
                  ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}
                </div>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">${fb.comment}</p>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; text-align: right;">${fb.createdAt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getFeedbackTypeLabel(type) {
  switch (type) {
    case 'suggest': return 'Öneri';
    case 'bug': return 'Hata Bildirimi';
    case 'support': return 'Destek';
    case 'happy': return 'Memnuniyet';
    default: return 'Geri Bildirim';
  }
}

function getFeedbackTypeColor(type) {
  switch (type) {
    case 'suggest': return 'var(--primary-blue-light)';
    case 'bug': return 'var(--neon-red)';
    case 'support': return 'var(--neon-amber)';
    case 'happy': return 'var(--neon-green)';
    default: return 'var(--text-muted)';
  }
}

function selectFeedbackType(type) {
  document.getElementById('fb-type').value = type;
  document.querySelectorAll('.feedback-type-btn').forEach(btn => {
    if (btn.getAttribute('data-type') === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setFeedbackStarRating(rating) {
  document.getElementById('fb-rating').value = rating;
  const stars = document.querySelectorAll('#fb-star-rating i');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function handleCreateFeedback(e) {
  e.preventDefault();
  const subject = document.getElementById('fb-subject').value;
  const type = document.getElementById('fb-type').value;
  const rating = parseInt(document.getElementById('fb-rating').value);
  const comment = document.getElementById('fb-comment').value;
  
  const newFb = {
    id: 'f' + (state.feedbacks.length + 1),
    subject,
    type,
    comment,
    rating,
    createdAt: new Date().toLocaleDateString('tr-TR')
  };
  
  setState(s => {
    s.feedbacks.unshift(newFb);
  });
  
  showToast("Geri bildiriminiz başarıyla iletildi, teşekkür ederiz!");
}

// ----------------------------------------------------
// ÇİFT TARAFLI DEĞERLENDİRME MODALI & HANDELLER
// ----------------------------------------------------

function renderBidirectionalRatingModal() {
  const brm = state.bidirectionalRatingModal;
  const cargo = state.cargos.find(c => c.id === brm.cargoId);
  if (!cargo) return '';
  
  let roleTitle = '';
  let roleDesc = '';
  if (brm.role === 'sender_to_carrier') {
    roleTitle = `Gezgin (Taşıyıcı) Değerlendirmesi`;
    roleDesc = `Kargonuzu taşıyan <strong>${brm.toUser}</strong> isimli gezgini değerlendiriyorsunuz. Taşıma hızı, paket özeni ve iletişimi nasıldı?`;
  } else if (brm.role === 'carrier_to_sender') {
    roleTitle = `Gönderici Değerlendirmesi`;
    roleDesc = `Kargosunu taşıdığınız <strong>${brm.toUser}</strong> isimli üyeyi değerlendiriyorsunuz. Paketleme özeni ve içerik beyanı doğru muydu?`;
  } else if (brm.role === 'carrier_to_receiver') {
    roleTitle = `Alıcı Değerlendirmesi`;
    roleDesc = `Kargosunu teslim ettiğiniz <strong>${brm.toUser}</strong> isimli üyeyi değerlendiriyorsunuz. Dolaptan teslim alma hızı ve iletişimi nasıldı?`;
  } else if (brm.role === 'receiver_to_carrier') {
    roleTitle = `Gezgin (Taşıyıcı) Değerlendirmesi`;
    roleDesc = `Kargonuzu size ulaştıran <strong>${brm.toUser}</strong> isimli gezgini değerlendiriyorsunuz. Teslimat hızı ve paket durumu nasıldı?`;
  }

  return `
    <div class="glass-card modal-content spatial-locker-modal" style="max-width: 440px; padding: 30px; text-align: center;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="font-weight: 800; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="award" style="color: var(--neon-amber)"></i> ${roleTitle}
        </h3>
        <button style="background: transparent; border: none; color: #fff; cursor: pointer;" onclick="closeBidirectionalRatingModal()">
          <i data-lucide="x"></i>
        </button>
      </div>

      <p style="color: var(--spatial-text-muted); font-size: 0.85rem; margin-bottom: 24px; text-align: left; line-height: 1.5;">
        ${roleDesc}
      </p>
      
      <div class="star-rating" style="margin-bottom: 24px;" id="brm-star-rating">
        <i data-lucide="star" class="${brm.rating >= 1 ? 'active' : ''}" onclick="setBidirectionalStarRating(1)"></i>
        <i data-lucide="star" class="${brm.rating >= 2 ? 'active' : ''}" onclick="setBidirectionalStarRating(2)"></i>
        <i data-lucide="star" class="${brm.rating >= 3 ? 'active' : ''}" onclick="setBidirectionalStarRating(3)"></i>
        <i data-lucide="star" class="${brm.rating >= 4 ? 'active' : ''}" onclick="setBidirectionalStarRating(4)"></i>
        <i data-lucide="star" class="${brm.rating >= 5 ? 'active' : ''}" onclick="setBidirectionalStarRating(5)"></i>
      </div>

      <div class="form-group" style="text-align: left;">
        <label style="color: var(--spatial-text-muted)">YORUMUNUZ</label>
        <textarea id="brm-comment" placeholder="Bu üye hakkındaki değerlendirmenizi buraya yazın..." class="form-input" style="height: 100px; resize: none; background: rgba(255,255,255,0.05) !important; color: #fff !important; border: 1px solid var(--spatial-border) !important;"></textarea>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button class="btn btn-outline" style="flex: 1; border-color: var(--spatial-border); color: #fff;" onclick="closeBidirectionalRatingModal()">İptal</button>
        <button class="btn btn-primary" style="flex: 1.5;" onclick="submitBidirectionalRating()">
          Değerlendir <i data-lucide="send"></i>
        </button>
      </div>
    </div>
  `;
}

function openBidirectionalRatingModal(cargoId, fromUser, toUser, role) {
  setState(s => {
    s.bidirectionalRatingModal.active = true;
    s.bidirectionalRatingModal.cargoId = cargoId;
    s.bidirectionalRatingModal.fromUser = fromUser;
    s.bidirectionalRatingModal.toUser = toUser;
    s.bidirectionalRatingModal.role = role;
    s.bidirectionalRatingModal.rating = 5;
    s.bidirectionalRatingModal.comment = '';
  });
}

function closeBidirectionalRatingModal() {
  setState(s => {
    s.bidirectionalRatingModal.active = false;
  });
}

function setBidirectionalStarRating(rating) {
  setState(s => {
    s.bidirectionalRatingModal.rating = rating;
  });
}

function submitBidirectionalRating() {
  const brm = state.bidirectionalRatingModal;
  const comment = document.getElementById('brm-comment').value.trim();
  
  if (brm.rating === 0) {
    showToast("Lütfen puan verin!", false);
    return;
  }
  
  const newRating = {
    id: 'r' + (state.ratings.length + 1),
    cargoId: brm.cargoId,
    fromUser: brm.fromUser,
    toUser: brm.toUser,
    role: brm.role,
    rating: brm.rating,
    comment: comment || "Değerlendirme bırakıldı.",
    createdAt: new Date().toLocaleDateString('tr-TR')
  };
  
  setState(s => {
    s.ratings.push(newRating);
    s.bidirectionalRatingModal.active = false;
  });
  
  showToast("Değerlendirmeniz başarıyla kaydedildi! Üye skoru güncellendi.");
}

function getTimelineProgressWidth(status) {
  switch (status) {
    case 'AWAITING_LOCKER_A': return 10;
    case 'SECURED_IN_LOCKER_A': return 35;
    case 'IN_TRANSIT': return 60;
    case 'SECURED_IN_LOCKER_B': return 85;
    case 'DELIVERED': return 100;
  }
}

function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Uygulama İlk Yüklemesi
window.onload = () => {
  render();
};
