import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Stats from "./Stats"
import confetti from 'canvas-confetti';
import { DialogStats } from "@/utils/types";


function Popup({ openDialogProp, onSetInitialValues, endGameResult, stats, onStartNewGame }: {
    openDialogProp: boolean, /* Prop to open the modal */
    onSetInitialValues?: (numDices: number, numRolls: number) => void, /* Callback function to set the initial values */
    endGameResult?: {
        result: string,
        resultText: string
    },
    stats?: DialogStats, /* Stats prop for embedded <Stats/> */
    onStartNewGame?: () => void, /* Callback function to start a new game */
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(openDialogProp);
    const [numberOfDices, setNumberOfDices] = useState(1);
    const [numberOfRolls, setNumberOfRolls] = useState(1);

    if (endGameResult?.result == 'win') {
        confetti();
    }

    function handleClick() {
        if (onSetInitialValues) {
            onSetInitialValues(numberOfDices, numberOfRolls);
        }

        if (onStartNewGame) {
            onStartNewGame();
        }

        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {!endGameResult && (
                        <>
                            <DialogTitle>Initial Values</DialogTitle>
                            <DialogDescription>
                                Set the initial values for this game. Click save when you're done.
                            </DialogDescription>
                        </>
                    )}
                    {endGameResult && (
                        <>
                            <DialogTitle>{endGameResult.result == 'win' ? 'Victory' : 'Defeat'}</DialogTitle>
                            <DialogDescription>
                                {endGameResult.resultText}
                            </DialogDescription>
                        </>
                    )}
                </DialogHeader>

                {!endGameResult && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dices" className="text-right">
                                Number of dices (1-100)
                            </Label>
                            <Input
                                id="dices"
                                type="number"
                                min={1}
                                max={100}
                                defaultValue={numberOfDices}
                                className="col-span-3"
                                onChange={(e) => {
                                    let numOfDices = Number(e.target.value);
                                    setNumberOfDices(numOfDices)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rolls" className="text-right">
                                Number of rolls (1-10)
                            </Label>
                            <Input
                                id="rolls"
                                type="number"
                                min={1}
                                max={10}
                                defaultValue={numberOfRolls}
                                className="col-span-3"
                                onChange={(e) => setNumberOfRolls(Number(e.target.value))}
                            />
                        </div>
                    </div>
                )}

                {stats && (
                    <Stats stats={stats ? stats : {
                        numberOfRolls: 0,
                        targetScore: 0,
                        highScore: 0,
                        rollResult: [0]
                    }} endGameResultProp={endGameResult} />
                )}

                <DialogFooter>
                    {!endGameResult && (
                        <>
                            <Button onClick={handleClick} type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" disabled={numberOfDices <= 0 || numberOfDices > 100 || numberOfRolls <=0 || numberOfRolls > 10}>Save changes</Button>
                        </>
                    )}
                    {endGameResult && (
                        <>
                            <Button onClick={handleClick} type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Start a new game</Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Popup;