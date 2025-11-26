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

const NaverSearchTab: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query && query.trim()) {
      const searchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;

      // 모바일 앱에서는 InAppBrowser 사용, 웹에서는 새 탭
      if (isPlatform('capacitor')) {
        await Browser.open({ url: searchUrl });
      } else {
        window.open(searchUrl, '_blank');
      }
    }
  };

  const openNaver = async () => {
    const url = 'https://www.naver.com';
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
          <IonTitle>네이버 검색</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="search-container">
          <h2>네이버 검색</h2>
          <p className="search-description">
            검색어를 입력하고 버튼을 누르면 {isPlatform('capacitor') ? '앱 내 브라우저' : '새 창'}에서 네이버 검색 결과가 열립니다.
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
            네이버에서 검색
          </IonButton>

          <IonList className="quick-links">
            <IonItem button onClick={openNaver}>
              <IonLabel>
                <h3>네이버 메인</h3>
                <p>네이버 홈페이지 열기</p>
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

export default NaverSearchTab;
