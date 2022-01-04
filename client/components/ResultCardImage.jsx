import React, { useState, useEffect } from 'react';
import '../styles/ResultCardImage.css';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

// RENDER RESULT CARD IMAGE FUNCTION //
const ResultCardImage = (props) => {
  // ROTATE CARD FUNCTION //
  const [rotateCard, setRotateCard] = useState(true);
  const rotateresultCard = (e) => {
    setRotateCard(!rotateCard);
  };

  // PROPS TO VARIABLES //
  const name = props.resultCardInfo.name;
  const rating = props.resultCardInfo.rating;
  const background_image = props.resultCardInfo.background_image;
  const released = props.resultCardInfo.released;
  const platforms = props.resultCardInfo.platforms;
  const genres = props.resultCardInfo.genres;
  const stores = props.resultCardInfo.stores;
  const tags = props.resultCardInfo.tags;
  const esrb = props.resultCardInfo.esrb_rating;
  const screenshots = props.resultCardInfo.screenshots;

  // MAKE GENRES STRING //
  let genresString = '';
  // for (let i = 0; i < props.resultCardInfo.genres.length; i++) {
  //   genresString += ``;
  // }
  // genres.forEach((genre) => {
  //   console.log('hello')
  // });

  console.log(props.resultCardInfo);
  console.log(genres);

  // CREATE ACCORDIAN FUNCTION //
  const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  // CREATE ACCORDIAN SUMMARY FUNCTION //
  const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />)(
    ({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',

      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
      },
    })
  );

  // ACCORDIAN DETAILS //
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  // MORE INFO DROPDOWN FUNCTION //
  const MoreInfo = () => {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
      <div>
        <div id='collapsible-component'>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
              <Typography>More Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul className='list-1'>
                  <li>Name: {name}</li>
                  <li>Rating: {rating}</li>
                  <li>ESRB Rating: {}</li>
                  <li>Released: {released}</li>
                  <li>Platforms: {}</li>
                  <li>Genres: {} </li>
                  <li>Tags: {}</li>
                  <li>Stores: {}</li>
                </ul>
                {/* <ul className='list-1'>
                <li>Massively Multiplayer</li>
                <li>Platformer</li>
                <li>Puzzle</li>
                <li>Racing</li>
                <li>RPG</li>
                <li>Shooter</li>
                <li>Simulation</li>
                <li>Sports</li>
                <li>Strategy</li>
              </ul> */}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );
  };

  // MAIN RENDER RETURN //
  return (
    <React.Fragment>
      <div>
        <section onClick={rotateresultCard} className={rotateCard ? 'resultCard' : 'resultCard active'}>
          <div className='front'>
            <img className='game-image' src={background_image}></img>
            {/* <img className='game-image' src='https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'></img> */}

            <div className='front-info'>
              <div className='name'>{`${name}`}</div>
              <div className='rating'>{`Rating: ${rating} / 100`}</div>
            </div>
          </div>
          {/* <div className='back'><div>HELLO THIS IS A TEST</div></div> */}
        </section>
        <MoreInfo />
      </div>
    </React.Fragment>
  );
};

export default ResultCardImage;
