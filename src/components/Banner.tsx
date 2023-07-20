import '../App.css';
import './banner.css'
import battle1 from '../icons/battle1.png'
import battle2 from '../icons/battle2.png'
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { toPng } from 'html-to-image';
import { Match } from './match';

function Banner(prop: any) {

  const [match, setMatch] = useState<Match | undefined>();

  const [player1Icon, setPlayer1Icon] = useState<string>(`../icons/battle1.png`);
  const [player2Icon, setPlayer2Icon] = useState<string>(`../icons/battle1.png`);

  const divRef = useRef<HTMLDivElement>(null); // Use HTMLElement type assertion with null initial value


  useEffect(() => {
    // Your effect logic here
    // For example, if you want to update player names and icons when 'prop' changes:

    setMatch(prop.prop);

  }, [prop]);

  useEffect(() => {

    console.log(match)

  }, [match])

  const SaveDivAsImage = () => {

    const divElement = divRef.current;

    // Ensure divElement is defined before proceeding
    if (!divElement) {
      return;
    }



    // Convert the div to an image using htmlToImage library
    toPng(divElement)
      .then(function (dataUrl) {
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.download = "imgPairing_" + match?.player1 + "-" +  match?.player2 + ".png"; // You can set a custom filename here
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(function (error) {
        console.error('Error saving the image:', error);
      });

  }



  return (

    <div >
      <div className='rectangle' ref={divRef}>

        <div className='score'>
          {match?.score == undefined && '. – .'}
          {match?.score != undefined && match.score}
        </div>

        <div className='matchType'>
          {match?.gameType} - {match?.gameCode}
        </div>
        <div className='statusPlayed'>
          {match?.statusPlayed}
        </div>

        <div className='player1'>
          {match?.attacker == true &&
            match?.player1}
          {!match?.attacker == true &&
            match?.player2}
        </div>

        <div className='player2'>
          {match?.attacker == true &&
            match?.player2}
          {!match?.attacker == true &&
            match?.player1}
        </div>

        {match?.attacker == true &&
          <img src={process.env.PUBLIC_URL + '/factions/' + `${match?.army1}.png`} className='player1Icon'></img>
        }
        {match?.attacker == true &&
          <img src={process.env.PUBLIC_URL + '/factions/' + `${match?.army2}.png`} className='player2Icon'></img>
        }

        {match?.attacker == false &&
          <img src={process.env.PUBLIC_URL + '/factions/' + `${match?.army1}.png`} className='player2Icon'></img>
        }
        {match?.attacker == false &&
          <img src={process.env.PUBLIC_URL + '/factions/' + `${match?.army2}.png`} className='player1Icon'></img>
        }

        <img src={battle1} className='iconBattle1'></img>
        <img src={battle2} className='iconBattle2'></img>


      </div>

      <button onClick={SaveDivAsImage}>Button</button>
    </div>
  );
}


export default Banner;