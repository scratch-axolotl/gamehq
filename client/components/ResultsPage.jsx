import React from 'react';
import { useState } from 'react';
import ResultCardImage from './ResultCardImage';
import '../styles/ResultsPage.scss';

const ResultsPage = (props) => {
  // TEST GAME REF //

  // RESULT CARD INFO STATE //
  //const [resultCardInfo, setresultCardInfo] = useState({});
  //const [cardArray, setcardArray] = useState({});

  const [gotCards, setgotCards] = useState(false);

  // SETTING RESULT CARD INFO STATE //
  const resultCardData = (info) => {
    console.log('specific card info');
    console.log(info);
    console.log(info.esrb_rating);
    console.log(info.esrb_rating === null)
    //console.log(info.name);
    const cardObj = {
      name: info.name,
      rating: info.metacritic,
      background_image: info.background_image,
      released: info.released,
      platforms: info.platforms,
      genres: info.genres,
      stores: info.stores,
      tags: info.tags,
      screenshots: info.short_screenshots,
    };

    //ESRB CONDITIONALS //
    if (info.esrb_rating === null || !info.esrb_rating) {
      cardObj.esrb_rating = {
        'name': ''
      }
    }
    else if (info.esrb_rating.name === null || !info.esrb_rating.name) {
      cardObj.esrb_rating.name = 'N/A';
    } else {
      cardObj.esrb_rating = {
        name : info.esrb_rating.name
      }
    }

    return cardObj;
  };

  // GENERATE TEST GAME BUTTON //
  const handleClick = () => {
    console.log('RESULTS CLICKED');
    setgotCards(true);

  };

  // RESULTS RETURN FROM BACKEND CALL WITH RESULT CARD IMAGE FOR EACH //

  const cardArray = [];
  for (let i = 0; i < props.searchresults.length; i++) {
    const result = resultCardData(props.searchresults[i]);
    cardArray.push(<ResultCardImage key={i + 'a'} resultCardInfo={result}/>);
  }

  // RETURN RENDER //
  return (
    <div className='resultsContainer'>
      <h3 className='resultsMessage'>HERE ARE YOUR RESULTS</h3>
      <button onClick={handleClick}>CLICK ME FOR RESULTS</button>
      {/*<ResultCardImage resultCardInfo={resultCardInfo} />*/}
      {cardArray}
      {/* {resultsToDisplay} */}
    </div>
  );
};

export default ResultsPage;




const testGame = {
    id: 3498,
    slug: 'grand-theft-auto-v',
    name: 'Grand Theft Auto V',
    released: '2013-09-17',
    tba: false,
    background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
    rating: 4.48,
    rating_top: 5,
    ratings: [
      {
        id: 5,
        title: 'exceptional',
        count: 3164,
        percent: 59.15,
      },
      {
        id: 4,
        title: 'recommended',
        count: 1763,
        percent: 32.96,
      },
      {
        id: 3,
        title: 'meh',
        count: 334,
        percent: 6.24,
      },
      {
        id: 1,
        title: 'skip',
        count: 88,
        percent: 1.65,
      },
    ],
    ratings_count: 5287,
    reviews_text_count: 34,
    added: 16408,
    added_by_status: {
      yet: 403,
      owned: 9725,
      beaten: 4401,
      toplay: 469,
      dropped: 814,
      playing: 596,
    },
    metacritic: 97,
    playtime: 71,
    suggestions_count: 402,
    updated: '2021-08-20T12:42:02',
    user_game: null,
    reviews_count: 5349,
    saturated_color: '0f0f0f',
    dominant_color: '0f0f0f',
    platforms: [
      {
        platform: {
          id: 1,
          name: 'Xbox One',
          slug: 'xbox-one',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 5144,
          image_background: 'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: null,
        requirements_ru: null,
      },
      {
        platform: {
          id: 186,
          name: 'Xbox Series S/X',
          slug: 'xbox-series-x',
          image: null,
          year_end: null,
          year_start: 2020,
          games_count: 384,
          image_background: 'https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: null,
        requirements_ru: null,
      },
      {
        platform: {
          id: 14,
          name: 'Xbox 360',
          slug: 'xbox360',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 2742,
          image_background: 'https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: null,
        requirements_ru: null,
      },
      {
        platform: {
          id: 16,
          name: 'PlayStation 3',
          slug: 'playstation3',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 3630,
          image_background: 'https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: null,
        requirements_ru: null,
      },
      {
        platform: {
          id: 18,
          name: 'PlayStation 4',
          slug: 'playstation4',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 6199,
          image_background: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: null,
        requirements_ru: null,
      },
      {
        platform: {
          id: 187,
          name: 'PlayStation 5',
          slug: 'playstation5',
          image: null,
          year_end: null,
          year_start: 2020,
          games_count: 440,
          image_background: 'https://media.rawg.io/media/games/709/709bf81f874ce5d25d625b37b014cb63.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: null,
        requirements_ru: null,
      },
      {
        platform: {
          id: 4,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 397822,
          image_background: 'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',
        },
        released_at: '2013-09-17',
        requirements_en: {
          minimum:
            'Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.',
          recommended:
            'Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:',
        },
        requirements_ru: null,
      },
    ],
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: 'PC',
          slug: 'pc',
        },
      },
      {
        platform: {
          id: 2,
          name: 'PlayStation',
          slug: 'playstation',
        },
      },
      {
        platform: {
          id: 3,
          name: 'Xbox',
          slug: 'xbox',
        },
      },
    ],
    genres: [
      {
        id: 4,
        name: 'Action',
        slug: 'action',
        games_count: 137057,
        image_background: 'https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg',
      },
      {
        id: 3,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 102115,
        image_background: 'https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg',
      },
    ],
    stores: [
      {
        id: 290375,
        store: {
          id: 3,
          name: 'PlayStation Store',
          slug: 'playstation-store',
          domain: 'store.playstation.com',
          games_count: 7702,
          image_background: 'https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg',
        },
      },
      {
        id: 438095,
        store: {
          id: 11,
          name: 'Epic Games',
          slug: 'epic-games',
          domain: 'epicgames.com',
          games_count: 693,
          image_background: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',
        },
      },
      {
        id: 290376,
        store: {
          id: 1,
          name: 'Steam',
          slug: 'steam',
          domain: 'store.steampowered.com',
          games_count: 58480,
          image_background: 'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg',
        },
      },
      {
        id: 290377,
        store: {
          id: 7,
          name: 'Xbox 360 Store',
          slug: 'xbox360',
          domain: 'marketplace.xbox.com',
          games_count: 1911,
          image_background: 'https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg',
        },
      },
      {
        id: 290378,
        store: {
          id: 2,
          name: 'Xbox Store',
          slug: 'xbox-store',
          domain: 'microsoft.com',
          games_count: 4681,
          image_background: 'https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg',
        },
      },
    ],
    clip: null,
    tags: [
      {
        id: 31,
        name: 'Singleplayer',
        slug: 'singleplayer',
        language: 'eng',
        games_count: 143832,
        image_background: 'https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg',
      },
      {
        id: 40847,
        name: 'Steam Achievements',
        slug: 'steam-achievements',
        language: 'eng',
        games_count: 24322,
        image_background: 'https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg',
      },
      {
        id: 7,
        name: 'Multiplayer',
        slug: 'multiplayer',
        language: 'eng',
        games_count: 28697,
        image_background: 'https://media.rawg.io/media/games/c80/c80bcf321da44d69b18a06c04d942662.jpg',
      },
      {
        id: 13,
        name: 'Atmospheric',
        slug: 'atmospheric',
        language: 'eng',
        games_count: 18312,
        image_background: 'https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg',
      },
      {
        id: 40836,
        name: 'Full controller support',
        slug: 'full-controller-support',
        language: 'eng',
        games_count: 11266,
        image_background: 'https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg',
      },
      {
        id: 42,
        name: 'Great Soundtrack',
        slug: 'great-soundtrack',
        language: 'eng',
        games_count: 3175,
        image_background: 'https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg',
      },
      {
        id: 24,
        name: 'RPG',
        slug: 'rpg',
        language: 'eng',
        games_count: 13367,
        image_background: 'https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg',
      },
      {
        id: 18,
        name: 'Co-op',
        slug: 'co-op',
        language: 'eng',
        games_count: 7670,
        image_background: 'https://media.rawg.io/media/games/83f/83f6f70a7c1b86cd2637b029d8b42caa.jpg',
      },
      {
        id: 36,
        name: 'Open World',
        slug: 'open-world',
        language: 'eng',
        games_count: 4565,
        image_background: 'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg',
      },
      {
        id: 411,
        name: 'cooperative',
        slug: 'cooperative',
        language: 'eng',
        games_count: 3140,
        image_background: 'https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg',
      },
      {
        id: 8,
        name: 'First-Person',
        slug: 'first-person',
        language: 'eng',
        games_count: 17745,
        image_background: 'https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg',
      },
      {
        id: 149,
        name: 'Third Person',
        slug: 'third-person',
        language: 'eng',
        games_count: 5897,
        image_background: 'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg',
      },
      {
        id: 4,
        name: 'Funny',
        slug: 'funny',
        language: 'eng',
        games_count: 16522,
        image_background: 'https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg',
      },
      {
        id: 37,
        name: 'Sandbox',
        slug: 'sandbox',
        language: 'eng',
        games_count: 4312,
        image_background: 'https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg',
      },
      {
        id: 123,
        name: 'Comedy',
        slug: 'comedy',
        language: 'eng',
        games_count: 7840,
        image_background: 'https://media.rawg.io/media/screenshots/f2f/f2f3c93d6153da7aee590f3ab8ccd803.jpg',
      },
      {
        id: 150,
        name: 'Third-Person Shooter',
        slug: 'third-person-shooter',
        language: 'eng',
        games_count: 1965,
        image_background: 'https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg',
      },
      {
        id: 62,
        name: 'Moddable',
        slug: 'moddable',
        language: 'eng',
        games_count: 637,
        image_background: 'https://media.rawg.io/media/games/5fa/5fae5fec3c943179e09da67a4427d68f.jpg',
      },
      {
        id: 144,
        name: 'Crime',
        slug: 'crime',
        language: 'eng',
        games_count: 2052,
        image_background: 'https://media.rawg.io/media/games/10d/10d19e52e5e8415d16a4d344fe711874.jpg',
      },
      {
        id: 62349,
        name: 'vr mod',
        slug: 'vr-mod',
        language: 'eng',
        games_count: 17,
        image_background: 'https://media.rawg.io/media/games/645/64578c2a6daa30995692525172fd13ef.jpg',
      },
    ],
    esrb_rating: {
      id: 4,
      name: 'Mature',
      slug: 'mature',
    },
    short_screenshots: [
      {
        id: -1,
        image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
      },
      {
        id: 1827221,
        image: 'https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg',
      },
      {
        id: 1827222,
        image: 'https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg',
      },
      {
        id: 1827223,
        image: 'https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg',
      },
      {
        id: 1827225,
        image: 'https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg',
      },
      {
        id: 1827226,
        image: 'https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg',
      },
      {
        id: 1827227,
        image: 'https://media.rawg.io/media/screenshots/592/592e2501d8734b802b2a34fee2df59fa.jpg',
      },
    ],
  };
