import { Container } from "@mui/material";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  WhatsappIcon,
} from "react-share";
import '../../sass/dashboard.scss';

const ShareButtonsTournament = ({ tournament }) => {
  const domain = window.location.origin;

  return (
    <Container maxWidth='xs' className="share" sx={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="share-icons">
        <EmailShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          subject={`🏆 GameGridder Tournament: ${tournament.name}`}
          body={`Check out this tournament!\n\nTournament Name: ${tournament.name}\nTournament Description: ${tournament.description}\nTournament Start Date: ${tournament.start_date}\nTournament Link:\n`
        }
        >
          <EmailIcon className="share-icon" size={"3rem"} round bgStyle={{fill: "#c71610"}}/>
        </EmailShareButton>

        <FacebookShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          quote={`Check out this GameGridder tournament: ${tournament.name}`}
          hashtag="GameGridder"
        >
          <FacebookIcon className="share-icon" size={"3rem"} round bgStyle={{fill: "#3b5998"}} />
        </FacebookShareButton>

        <WhatsappShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          title={`GameGridder Tournament: ${tournament.name}`}
        >
          <WhatsappIcon className="share-icon" size={"3rem"} round bgStyle={{fill: "#25D366"}}/>
        </WhatsappShareButton>

        <RedditShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          title={`GameGridder Tournament: ${tournament.name}`}
        >
          <RedditIcon className="share-icon" size={"3rem"} round bgStyle={{fill: "#ff4500"}}/>
        </RedditShareButton>
      </div>
    </Container>
  );
};

export default ShareButtonsTournament;