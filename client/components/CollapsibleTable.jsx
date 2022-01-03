import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Pacman from '../dist/images/pacman.svg';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div id='collapsible-component'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>Genres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='list-1'>
              <li>Action</li>
              <li>Adventure</li>
              <li>Arcade</li>
              <li>Board Games</li>
              <li>Card</li>
              <li>Casual</li>
              <li>Education</li>
              <li>Family</li>
              <li>Fighting</li>
              <li>Indie</li>
            </ul>
            <ul className='list-1'>
              <li>Massively Multiplayer</li>
              <li>Platformer</li>
              <li>Puzzle</li>
              <li>Racing</li>
              <li>RPG</li>
              <li>Shooter</li>
              <li>Simulation</li>
              <li>Sports</li>
              <li>Strategy</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Typography>Platforms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='list-2'>
              <li>3DO</li>
              <li>Android</li>
              <li>Apple II</li>
              <li>Atari 8-bit</li>
              <li>Atari 2600</li>
              <li>Atari 5200</li>
              <li>Atari 7800</li>
              <li>Atari Lynx</li>
              <li>Atari ST</li>
              <li>Atari Flashback</li>
              <li>Atari XEGS</li>
              <li>Classic Macintosh</li>
              <li>Commodore / Amiga</li>
              <li>Dreamcast</li>
              <li>Game Boy</li>
              <li>Game Boy Advance</li>
              <li>Game Boy Color</li>
            </ul>
            <ul className='list-2'>
              <li>GameCube</li>
              <li>Game Gear</li>
              <li>Genesis</li>
              <li>Jaguar</li>
              <li>Linux</li>
              <li>macOS</li>
              <li>Neo Geo</li>
              <li>NES</li>
              <li>Nintendo 3DS</li>
              <li>Nintendo DS</li>
              <li>Nintendo DSi</li>
              <li>Nintendo 64</li>
              <li>Nintendo Switch</li>
              <li>PC</li>
              <li>PlayStation</li>
              <li>PlayStation 2</li>
            </ul>
            <ul className='list-2'>
              <li>PlayStation 3</li>
              <li>PlayStation 4</li>
              <li>PlayStation 5</li>
              <li>PSP</li>
              <li>PS Vita</li>
              <li>SEGA Master System</li>
              <li>SEGA Saturn</li>
              <li>SEGA 32X</li>
              <li>SEGA CD</li>
              <li>SNES</li>
              <li>Web</li>
              <li>Wii</li>
              <li>Wii U</li>
              <li>Xbox</li>
              <li>Xbox 360Xbox One</li>
              <li>Xbox Series S/X</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
          <Typography>Tags</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='list-3'>
              <li>2D</li>
              <li>3D</li>
              <li>Action-Adventure</li>
              <li>Anime</li>
              <li>Co-op</li>
              <li>Exploration</li>
              <li>Fantasy</li>
              <li>First-Person</li>
              <li>FPS</li>
              <li>Horror</li>
              <li>Local Multiplayer</li>
              <li>Multiplayer</li>
              <li>Music</li>
            </ul>
            <ul className='list-3'>
              <li>Mystery</li>
              <li>Pixel Graphics</li>
              <li>Retro</li>
              <li>RPG</li>
              <li>Sci-fi</li>
              <li>Short</li>
              <li>Singleplayer</li>
              <li>Space</li>
              <li>Story</li>
              <li>Third Person</li>
              <li>Unity</li>
              <li>VR</li>
              <li>Zombies</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
