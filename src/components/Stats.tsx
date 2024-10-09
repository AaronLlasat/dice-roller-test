import { useEffect, useState } from "react";
import { Trophy } from "lucide-react"
import { DialogStats } from "@/utils/types";

function Stats({ onEndGame, stats, endGameResultProp }:
    {
        onEndGame?: ({ }: DialogStats, endGameResult: { result: string, resultText: string }) => void,
        stats: DialogStats,
        endGameResultProp?: { result: string, resultText: string }
    }
) {
    const [highScore, setHighScore] = useState(stats.highScore ? stats.highScore : 0);
    const [rollScore, setRollScore] = useState(stats.rollScore ? stats.rollScore : 0);
    const [numberOfRolls, setNumberOfRolls] = useState(stats.numberOfRolls);
    const [showAlert, setShowAlert] = useState(false);


    /* Hook triggered on new roll */
    useEffect(() => {
        const roll = sumRollTotal();

        if (roll > highScore) {
            setHighScore(roll);
            setShowAlert(true);
        }

        if (roll > 0) {
            setNumberOfRolls((prevNumRoles) => prevNumRoles - 1);
            setRollScore(roll);
        }
        
    }, [stats.rollResult]);


    function sumRollTotal(): number {
        if (stats.rollResult) {
            const newSum = stats.rollResult.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
            return newSum;
        }

        return 0;
    }

    useEffect(() => {
        if (numberOfRolls <= 0) {
            let newEndGameResult = { result: '', resultText: '' };

            if (highScore > stats.targetScore) {
                newEndGameResult = {
                    result: 'win',
                    resultText: 'You won! Was that just luck? Try again!'
                }
            } else {
                newEndGameResult = {
                    result: 'lose',
                    resultText: 'You lost :( Wanna try again?'
                }
            }

            setTimeout(() => {
                if (onEndGame) {
                    const dialogStats = {
                        highScore: highScore,
                        numberOfRolls: numberOfRolls,
                        targetScore: stats.targetScore,
                        rollScore: rollScore
                    }
                    onEndGame(dialogStats, newEndGameResult);
                }
            }, 750);
        }

    }, [numberOfRolls]);

    /* Hook triggered on new high score alert */
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1500)
            return () => clearTimeout(timer)
        }
    }, [showAlert]);


    return (
        <>
            <div className="flex flex-wrap justify-center gap-5 text-3xl font-bold tabular-nums leading-none w-full">

                <div className="flex gap-10 w-full justify-center">

                    <div className="w-1/3 p-2 flex flex-col gap-1 items-center">
                        <span className="text-red-600">{stats.targetScore}</span>
                        <span className="text-sm font-normal text-muted-foreground">target score</span>
                    </div>

                    <div className="w-1/3 p-2 flex flex-col gap-1 items-center">

                        {endGameResultProp?.result && (
                            <span className={endGameResultProp?.result == 'win' ? 'text-green-600' : 'text-gray-300'}>{highScore}</span>
                        )}

                        {!endGameResultProp && (
                            <>
                                <span className="text-red-600">{highScore}</span>
                            </>
                        )}

                        {showAlert && (
                            <div className="flex">
                                <span className="flex items-center justify-center gap-1 text-sm font-normal text-yellow-600">
                                    New!
                                    <div className="flex items-center justify-center w-5 h-5 bg-yellow-100 rounded-full border border-yellow-300 animate-bounce">
                                        <Trophy className="h-3 w-3 text-yellow-600" />
                                    </div>
                                    &nbsp;
                                </span>
                            </div>
                        )}

                        {!showAlert && (
                            <>
                                <span className="text-sm font-normal text-muted-foreground">high score</span>
                            </>
                        )}

                    </div>
                </div>

                {!endGameResultProp && (
                    <div className="flex gap-10 w-full justify-center">

                        <div className="w-1/3 p-2 flex flex-col gap-1 items-center">
                            <span className="text-red-600">{numberOfRolls}</span>
                            <span className="text-sm font-normal text-muted-foreground">total roll(s)</span>
                        </div>

                        <div className="w-1/3 p-2 flex flex-col gap-1 items-center">
                            <span className="text-red-600">{rollScore}</span>
                            <span className="text-sm font-normal text-muted-foreground">last roll</span>
                        </div>

                    </div>
                )}
            </div>
        </>
    )
}

export default Stats;