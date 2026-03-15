import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import moment from 'moment';
import './App.css';

function App() {
  const [showQR, setShowQR] = useState(false);
  // Start muted/of to avoid browser autoplay blocking errors. User must click to play.
  const [playing, setPlaying] = useState(false);

  // Ngày cưới: 04/04/2026 lúc 18:00 — keep a stable reference so effect doesn't re-run
  const weddingDate = React.useRef(moment('2026-04-04 18:00:00')).current;

  // Local audio file placed in `public/` (filename contains spaces/diacritics)
  const audioFile = 'Dắt Anh Về Nhà.mp3';
  const audioUrl = (process.env.PUBLIC_URL || '') + '/' + encodeURIComponent(audioFile);

  const audioRef = useRef(null);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(weddingDate.diff(now));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  // on-scroll reveal (intersection observer)
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    if (!els || els.length === 0) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wedding-invite">
      {/* Nút bật/tắt nhạc */}
      <div className="music-control">
        <button
          onClick={async () => {
            // toggle playback using native audio element to ensure user gesture
            if (!audioRef.current) return;
            if (playing) {
              audioRef.current.pause();
              setPlaying(false);
            } else {
              try {
                // set volume and attempt to play
                audioRef.current.volume = 0.6;
                await audioRef.current.play();
                setPlaying(true);
              } catch (err) {
                console.warn('Audio play() was blocked or failed:', err);
              }
            }
          }}
          aria-label="Toggle music"
        >
          {playing ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>

        {/* Native audio element (hidden) - use ref to control playback */}
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          preload="none"
          style={{ display: 'none' }}
        />
      </div>

      {/* Phần 1: Landing / Save the Date */}
      <section className="section landing">
        <div className="landing-hero">
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3765.jpg`} alt="Couple" className="hero-photo" />
        </div>

        <div className="landing-title">
          <div className="save-date scroll-reveal">SAVE OUR DATE | 04.04.2026</div>
          <h1 className="couple-names scroll-reveal"> TRUNG ĐỨC &amp; MAI PHƯƠNG </h1>
        </div>

        <div className="triptych">
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3765.jpg`} alt="Ảnh 1" className="triptych-img scroll-reveal left" />
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3676.jpg`} alt="Ảnh 2" className="triptych-img scroll-reveal mid" />
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3792.jpg`} alt="Ảnh 3" className="triptych-img scroll-reveal right" />
        </div>
      </section>

      {/* Phần 2: Thông tin hai bên gia đình */}
      <section className="section family">
        <h1 className="fly-in">WEDDING</h1>
        <div className="family-grid fly-in">
          <div className="groom">
            <h3>Nhà Trai</h3>
            <p>Ông: Phạm Đức Nghinh</p>
            <p>Bà: Bùi Thị Dung</p>
            <p>Đồng Quan - Hưng Yên</p>
            <h4>Phạm Trung Đức</h4>
          </div>
          <div className="bride">
            <h3>Nhà Gái</h3>
            <p>Ông: Phạm Long Phi</p>
            <p>Bà: Đặng Thanh Doãn</p>
            <p>Thôn 2A - Eahleo - Đắk Lắk</p>
            <h4>Phạm Đặng Mai Phương</h4>
          </div>
        </div>
        <h2 className="fly-in">Thư Mời</h2>
        <p className="fly-in">THAM DỰ LỄ BÁO HỶ CỦA CHÚNG MÌNH</p>
        <div className="gallery fly-in">
          <img className="left" src={`${process.env.PUBLIC_URL}/image/SUKA4711.jpg`} alt="Ảnh 1 - vườn hoa" />
          <img className="mid" src={`${process.env.PUBLIC_URL}/image/SUKA4745.jpg`} alt="Ảnh 2 - phông nền trắng (lớn hơn)" />
          <img className="right" src={`${process.env.PUBLIC_URL}/image/SUKA4704.jpg`} alt="Ảnh 3 - cô dâu chú rể" />
        </div>
        <p className="event-info fly-in">
          18:00 | 04.04.2026 | Thứ Bảy<br />
          Tức ngày 17 tháng 02 năm Bính Ngọ.
        </p>
        <h3 className="fly-in">Tại KALINA Wedding & Events</h3>
        <h3 className="location fly-in">107 Tân Thắng, Sơn Kỳ, Tân Phú, Thành phố Hồ Chí Minh</h3>
        <div className="map-wrapper fly-in" style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.15)' }}>
          <iframe
            title="KALINA Wedding & Events location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.289905046197!2d106.60720951471954!3d10.78809599232447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529e97f2d0c33%3A0x0!2s107%20T%C3%A2n%20Th%E1%BA%AFng%2C%20S%C6%A1n%20K%E1%BB%B9%2C%20T%C3%A2n%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1700729572000"
            style={{ width: '100%', height: '320px', border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Phần 3: Lịch ngày cưới */}
      <section className="section calendar">
        <h2 className="fly-in">Tháng 04</h2>
        <div className="calendar-grid fly-in">
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            return (
              <span key={day} className={day === 4 ? 'highlight' : undefined}>{day}</span>
            );
          })}
        </div>
      </section>

      {/* Phần 4: Trích dẫn tình yêu */}
      <section className="section quote">
        <div className="quote-grid">
          <div className="quote-left scroll-reveal">
            <img src={`${process.env.PUBLIC_URL}/image/SUKA4468.jpg`} alt="Cô dâu" />
            <p className="quote-en">If I know what love is,<br />it is because of you.</p>
          </div>

          <div className="quote-right scroll-reveal">
            <div className="stacked">
              <img src={`${process.env.PUBLIC_URL}/image/SUKA4413.jpg`} alt="Cặp đôi 1" />
              <img src={`${process.env.PUBLIC_URL}/image/SUKA4392.jpg`} alt="Cặp đôi 2" />
            </div>
            <p className="quote-vn">Khoảnh khắc gặp được em,<br />anh đã quyết định sẽ cùng em đi đến<br />hết cuộc đời.</p>
          </div>
        </div>
      </section>

     {/* Phần 5: With You
      <section className="section with-you">
        <h2 className="fly-in">WITH YOU</h2>
        <p className="fly-in">
          Every moment of each day,<br />
          loving and missing you<br />
          dominates every inch of my brain.
        </p>
        <img src="https://images.unsplash.com/photo-1606800052052-a08af7148861?w=800" alt="With You" className="fly-in" />
      </section>

     {/* Phần 6: Better man 
      <section className="section better-man">
        <p className="quote-en fly-in">You make me want to be a better man.</p>
        <img src="https://images.unsplash.com/photo-1529634809774-8ab5f00c18c1?w=800" alt="Better man" className="fly-in" />
        <p className="quote-vn fly-in">Em khiến anh muốn trở thành phiên bản tốt nhất của chính mình.</p>
      </section>
*/}
 {/* Phần 7: Countdown */}
<section className="section countdown" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/SUKA4609.jpg)` }}>
  <div className="countdown-top-bar">
    <div className="timer timer-horizontal">
      <div><span>{countdown.days}</span> ngày</div>
      <div><span>{countdown.hours}</span> giờ</div>
      <div><span>{countdown.minutes}</span> phút</div>
      <div><span>{countdown.seconds}</span> giây</div>
    </div>
  </div>
</section>
     {/* Phần 8: Love Frame */}
<section className="section love-frame-section fly-in">
  <div 
    className="love-frame-background"
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/SUKA3845.jpg)` }}
  >
    <div className="love-text-bottom">Love</div>
  </div>
</section>
      {/* Phần 9: Hộp quà cảm ơn */}
<section className="section gift">
  <h2 className="fly-in">HỘP QUÀ YÊU THƯƠNG</h2>
  
  {/* Hộp quà click để mở QR */}
  <div 
    className="gift-box fly-in" 
    onClick={() => setShowQR(true)}
    style={{ cursor: 'pointer' }}
  >
    🎁
  </div>
  
  <p className="fly-in">
    Cảm ơn bạn đã đồng hành và chúc phúc cho hành trình yêu thương của chúng mình.<br />
    Niềm vui hôm nay trọn vẹn hơn khi có bạn cùng chia sẻ!
  </p>

  {/* Modal QR - hiện khi click hộp quà */}
  {showQR && (
    <div className="qr-modal-overlay" onClick={() => setShowQR(false)}>
      <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close-btn" onClick={() => setShowQR(false)}>
          ×
        </button>
        
        {/* Dùng hình QR local của bạn */}
        <img 
          src={`${process.env.PUBLIC_URL}/image/Hinh1.png`} 
          alt="Mã QR chuyển khoản mừng cưới - PHẠM ĐẶNG MAI PHƯƠNG" 
          className="qr-image" 
        />

      </div>
    </div>
  )}
</section>
    </div>
  );
}

export default App;
