import gameshelf from '../dist/images/gameshelf.jpg';
import arrow from '../dist/images/arrow.png';
import arrowUp from '../dist/images/arrow-up.png';
import CollapsibleTable from './CollapsibleTable.jsx';
import Scroll from 'react-scroll';

const LandingPage = () => {
  const Element = Scroll.Element;
  const scroller = Scroll.scroller;

  function scrollDown() {
    scroller.scrollTo('solution', {
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }

  function scrollUp() {
    scroller.scrollTo('problem', {
      duration: 0,
      delay: 0,
      offset: -100,
      smooth: 'easeInOutQuart',
    });
  }

  return (
    <div>
      <nav id='nav-container' className='sticky'>
        <a href='/'>gameHQ</a>
        <ul id='nav-list'>
          <li className='nav-list-items'>
            <a href='/sign-up'>Sign Up</a>
          </li>
          <li className='nav-list-items'>
            <a href='/login'>Login</a>
          </li>
          <li className='nav-list-items'>
            <a className='svg-icon' href='https://github.com/scratch-axolotl/gamehq' target='_blank' rel='noreferrer noopener'>
              <svg className='svg-icons' viewBox='0 0 512 499.36' width='36' height='36'>
                <path d='M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z' />
              </svg>
            </a>
          </li>
          <li className='nav-list-items'>
            <button className='svg-icon'>Dark Mode</button>
          </li>
        </ul>
      </nav>

      <Element id='problem-section' name='problem'>
        <div id='problem-container'>
          <div className='image-container'>
            <img src={gameshelf} alt='gameshelf' />
          </div>
          <div className='intro-stack'>
            <div className='stack-item'>
              <h1>What is the Problem?</h1>
            </div>
            <div className='stack-item'>
              <p>
                The market for video games is oversaturated. It can be daunting to navigate this market, both in terms of trying to figure out what games to
                play given the user's preferences (genres, ratings) and figuring out where to buy them.
              </p>
            </div>
          </div>
        </div>
      </Element>

      <a onClick={scrollDown}>
        <img class='arrow-down' src={arrow} alt='arrow' />
      </a>
      <a onClick={scrollUp}>
        <img class='arrow-up' src={arrowUp} alt='arrow' />
      </a>

      <Element id='solution-section' name='solution'>
        <div id='solution-container'>
          <div className='intro-stack'>
            <div className='stack-item'>
              <h1>Our Solution</h1>
            </div>
            <div className='stack-item'>
              <p>A one-stop shop for users to find games (old and new) across all gaming platforms based on their specified search parameters and filters.</p>
            </div>
          </div>
          <div id='collapsible-component-container'>
            <CollapsibleTable />
          </div>
        </div>
      </Element>
    </div>
  );
};

export default LandingPage;
