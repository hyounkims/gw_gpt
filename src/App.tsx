import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chatbubbleEllipses, search, logoYoutube, logoGoogle } from 'ionicons/icons';

import ChatTab from './pages/ChatTab';
import NaverSearchTab from './pages/NaverSearchTab';
import YoutubeSearchTab from './pages/YoutubeSearchTab';
import GoogleSearchTab from './pages/GoogleSearchTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/chat">
            <ChatTab />
          </Route>
          <Route exact path="/naver">
            <NaverSearchTab />
          </Route>
          <Route exact path="/youtube">
            <YoutubeSearchTab />
          </Route>
          <Route exact path="/google">
            <GoogleSearchTab />
          </Route>
          <Route exact path="/">
            <Redirect to="/chat" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="chat" href="/chat">
            <IonIcon icon={chatbubbleEllipses} />
            <IonLabel>AI Chat</IonLabel>
          </IonTabButton>

          <IonTabButton tab="naver" href="/naver">
            <IonIcon icon={search} />
            <IonLabel>네이버</IonLabel>
          </IonTabButton>

          <IonTabButton tab="youtube" href="/youtube">
            <IonIcon icon={logoYoutube} />
            <IonLabel>유튜브</IonLabel>
          </IonTabButton>

          <IonTabButton tab="google" href="/google">
            <IonIcon icon={logoGoogle} />
            <IonLabel>구글</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
