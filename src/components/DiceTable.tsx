import Dice from "../components/Dice";

function DiceTable({ rollResultProp, isDiceRolling }:
    {
        rollResultProp: number[],
        isDiceRolling: boolean
    }
) {
    return (

        <div className="flex justify-center gap-12">
            <div className="flex items-center justify-center flex-wrap gap-5">
                {rollResultProp.map((roll, i) => (
                    <Dice key={i} rollResultProp={roll} isRolling={isDiceRolling} />
                ))}
            </div>
        </div>
    )
}


export default DiceTable;