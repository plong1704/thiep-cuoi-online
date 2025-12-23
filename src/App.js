import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import moment from 'moment';
import './App.css';

function App() {
  // Start muted/off to avoid browser autoplay blocking errors. User must click to play.
  const [playing, setPlaying] = useState(false);

  // Ngày cưới: 03/01/2026 lúc 10:30 — keep a stable reference so effect doesn't re-run
  const weddingDate = React.useRef(moment('2026-01-03 10:30:00')).current;

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

      {/* Phần 1: Mời cưới */}
      <section className="section hero">
        <div className="hero-top">
          <h1>WEDDING INVITATION</h1>
        </div>

        <div className="hero-grid">
          {/* 'I LOVE YOU' decorative curve removed per request */} 
          <div className="hero-arch fly-in-left">
            {/* Use local image from public/image and make it fit the arch */}
            <img src={`${process.env.PUBLIC_URL}/image/SUKA3765.jpg`} alt="Cô dâu chú rể" />
          </div>

          <div className="hero-details fly-in-right">
            <div className="details-block">
              <h2>THƯ MỜI TIỆC CƯỚI</h2>
              <div className="divider" />
              <h3 className="main-title">LỄ THÀNH HÔN</h3>
              <p className="time">THỨ BẢY - 10:30</p>
              <p className="date">03 . 01 . 2026</p>
            </div>
          </div>
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
        <p className="fly-in">THAM DỰ LỄ THÀNH HÔN CỦA CHÚNG MÌNH</p>
        <div className="gallery fly-in">
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3676.jpg`} alt="Ảnh 1" />
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3765.jpg`} alt="Ảnh 2" />
          <img src={`${process.env.PUBLIC_URL}/image/SUKA3792.jpg`} alt="Ảnh 3" />
        </div>
        <p className="event-info fly-in">
          08:00 | 03.01.2026 | Thứ bảy<br />
          Tức ngày 15 tháng 11 năm Ất Tỵ
        </p>
        <h3 className="fly-in">Tại Tư Gia Nhà Gái</h3>
        <p className="location fly-in">Thôn 2A - Eahleo - Đắk Lắk</p>
      </section>

      {/* Phần 3: Lịch ngày cưới */}
      <section className="section calendar">
        <h2 className="fly-in">Tháng 01</h2>
        <div className="calendar-grid fly-in">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            return (
              <span key={day} className={day === 3 ? 'highlight' : undefined}>{day}</span>
            );
          })}
        </div>
      </section>

      {/* Phần 4: Trích dẫn tình yêu */}
      <section className="section quote">
        <img src="https://images.unsplash.com/photo-1515934751635-c81c6ec7e10f?w=800" alt="Tình yêu" className="fly-in-left" />
        <div className="quote-text fly-in-right">
          <p>If I know what love is,<br />it is because of you.</p>
          <p>Khoảnh khắc gặp được em,<br />anh đã quyết định sẽ cùng em đi hết cuộc đời.</p>
        </div>
      </section>

      {/* Phần 5: With You */}
      <section className="section with-you">
        <h2 className="fly-in">WITH YOU</h2>
        <p className="fly-in">
          Every moment of each day,<br />
          loving and missing you<br />
          dominates every inch of my brain.
        </p>
        <img src="https://images.unsplash.com/photo-1606800052052-a08af7148861?w=800" alt="With You" className="fly-in" />
      </section>

      {/* Phần 6: Better man */}
      <section className="section better-man">
        <p className="quote-en fly-in">You make me want to be a better man.</p>
        <img src="https://images.unsplash.com/photo-1529634809774-8ab5f00c18c1?w=800" alt="Better man" className="fly-in" />
        <p className="quote-vn fly-in">Em khiến anh muốn trở thành phiên bản tốt nhất của chính mình.</p>
      </section>

      {/* Phần 7: Countdown */}
      <section className="section countdown">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800" alt="Countdown" className="fly-in-left" />
        <div className="timer fly-in-right">
          <div><span>{countdown.days}</span> ngày</div>
          <div><span>{countdown.hours}</span> giờ</div>
          <div><span>{countdown.minutes}</span> phút</div>
          <div><span>{countdown.seconds}</span> giây</div>
        </div>
      </section>

      {/* Phần 8: LOVE */}
      <section className="section love-frame">
        <img src="https://images.unsplash.com/photo-1600054809646-9a1ff2a3f5f4?w=800" alt="Love" className="fly-in" />
        <div className="love-text-overlay">LOVE</div>
      </section>

      {/* Phần 9: Hộp quà cảm ơn */}
      <section className="section gift">
        <h2 className="fly-in">HỘP QUÀ YÊU THƯƠNG</h2>
        <div className="gift-box fly-in">🎁</div>
        <p className="fly-in">
          Cảm ơn bạn đã đồng hành và chúc phúc cho hạnh trình yêu thương của chúng mình.<br />
          Niềm vui hôm nay trọn vẹn hơn khi có bạn cùng chia sẻ!
        </p>
      </section>
    </div>
  );
}

export default App;
