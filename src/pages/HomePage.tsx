import Stats from '../components/Stats'
import { useState } from 'react';
import Popup from '../components/Popup';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogStats } from '../utils/types';
import DiceTable from '../components/DiceTable';



function HomePage() {
  const [numberOfRolls, setNumberOfRolls] = useState(-1);
  const [numberOfDices, setNumberOfDices] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [rollResult, setRollResult] = useState<number[]>([]);
  const [targetScore, setTargetScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [endGameResult, setEndGameResult] = useState({ result: '', resultText: '' });
  const [dialogStats, setDialogStats] = useState<DialogStats>({
    numberOfRolls: 0,
    targetScore: 0,
    highScore: 0,
    rollResult: [0]
  });


  function setInitialValues(numDices: number, numRolls: number) {
    setNumberOfDices(numDices);
    setNumberOfRolls(numRolls);

    const newTargetScore = Math.floor((Math.random() * ((numDices * 6) - 1)) + 1);
    setTargetScore(newTargetScore);

    /* State update to render <DiceTable/> */
    const newRollResult = Array.from({ length: numDices }, () => 0);
    setRollResult(newRollResult)

    /* Initial stats for <Stats/> */
    setDialogStats({
      numberOfRolls: numRolls,
      targetScore: newTargetScore
    });
  }


  function calculateRoll() {
    rollAnimation();

    const newRoll = rollResult.map(() => Math.floor((Math.random() * 6) + 1));
    setRollResult(newRoll);

    const newNumberOfRolls = numberOfRolls - 1;
    setNumberOfRolls(newNumberOfRolls);

    /* Updated stats for <Stats/> */
    setDialogStats({
      numberOfRolls: newNumberOfRolls,
      rollResult: newRoll,
      targetScore: targetScore
    });
  }


  function rollAnimation() {
    setIsRolling(true);

    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  };


  function startNewGame() {
    setRollResult([]);
    setNumberOfRolls(-1);
    setNumberOfDices(0);
    setTargetScore(0);
    setEndGame(false);
  }


  function startEndGame(dialogStats: DialogStats, endGameResult: { result: string, resultText: string }) {
    setDialogStats({
      numberOfRolls: dialogStats.numberOfRolls,
      targetScore: dialogStats.targetScore,
      highScore: dialogStats.highScore,
      rollScore: dialogStats.rollScore
    })
    setEndGameResult(endGameResult);
    setEndGame(true);
  }


  return (
    <div className='bg-gradient-to-br from-gray-100 via-gray-50 to-white '>

      {numberOfDices > 0 && numberOfRolls >= 0 && (
        <div className='flex justify-center items-center flex-col gap-12 min-h-screen w-full '>
          <Card className={`m-5 flex flex-col gap-10`}>
            <CardHeader className="flex items-center gap-1">
              <CardTitle className="text-3xl mt-7 font-bold text-center text-red-600">Dice Roller</CardTitle>
              <CardDescription className='text-1xl'>Roll the dice and get a higher number to win.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-14">
                  <Stats onEndGame={startEndGame} stats={dialogStats} />
                  <DiceTable rollResultProp={rollResult} isDiceRolling={isRolling} />

                  <button onClick={calculateRoll} disabled={numberOfRolls <= 0 || isRolling} className={`w-32 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${numberOfRolls <= 0 || isRolling ? "opacity-40" : ""}`}>
                    Roll Dices
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!endGame && (
        <Popup onSetInitialValues={setInitialValues} openDialogProp={true} />
      )}

      {endGame && (
        <Popup onStartNewGame={startNewGame} openDialogProp={true} endGameResult={endGameResult} stats={dialogStats} />
      )}

    </div>
  )
}

export default HomePage;