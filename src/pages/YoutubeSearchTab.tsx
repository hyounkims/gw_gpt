import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  isPlatform,
} from '@ionic/react';
import { openOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import './SearchTab.css';

const YoutubeSearchTab: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query && query.trim()) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

      if (isPlatform('capacitor')) {
        await Browser.open({ url: searchUrl });
      } else {
        window.open(searchUrl, '_blank');
      }
    }
  };

  const openYoutube = async () => {
    const url = 'https://www.youtube.com';
    if (isPlatform('capacitor')) {
      await Browser.open({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>YouTube 검색</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="search-container">
          <h2>YouTube 검색</h2>
          <p className="search-description">
            검색어를 입력하고 버튼을 누르면 {isPlatform('capacitor') ? '앱 내 브라우저' : '새 창'}에서 유튜브 검색 결과가 열립니다.
          </p>

          <IonSearchbar
            value={query}
            onIonInput={(e) => setQuery(e.detail.value || '')}
            placeholder="검색어를 입력하세요"
            onKeyDown={handleKeyPress}
          />

          <IonButton
            expand="block"
            onClick={handleSearch}
            disabled={!query.trim()}
            className="search-action-button"
          >
            <IonIcon slot="start" icon={openOutline} />
            YouTube에서 검색
          </IonButton>

          <IonList className="quick-links">
            <IonItem button onClick={openYoutube}>
              <IonLabel>
                <h3>YouTube 메인</h3>
                <p>YouTube 홈페이지 열기</p>
              </IonLabel>
              <IonIcon slot="end" icon={openOutline} />
            </IonItem>
            {isPlatform('capacitor') && (
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    💡 모바일 앱에서는 앱 내장 브라우저로 열립니다.
                    <br />
                    뒤로가기 버튼으로 앱으로 돌아올 수 있습니다.
                  </p>
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default YoutubeSearchTab;
