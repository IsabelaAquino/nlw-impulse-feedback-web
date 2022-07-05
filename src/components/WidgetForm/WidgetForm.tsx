import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../img/Bug.svg'
import ideaImageUrl from '../../img/Idea.svg'
import thoughtImageUrl from '../../img/Thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentsStep } from "./Steps/FeedbackContentsStep";
import { Camera } from "phosphor-react";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes  = {
    BUG: {
        title: 'Problema',
        source: bugImageUrl,
        alt: 'Imagem de um inseto'
    },
    IDEA: {
        title: 'Ideia',
        source: ideaImageUrl,
        alt: 'Imagem de uma lâmpada'
    },
    OTHER: {
        title: 'Outro',
        source: thoughtImageUrl,
        alt: 'Imagem de um balão de pensamento'
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback(){
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return(
        <div className="bg-zinc-988 p-4 relative rounded-2xl nb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {
                feedbackSent ? (
                    <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
                ) : (
                    <>
                        {
                            !feedbackType ? (
                                <FeedbackTypeStep  setFeedbackType={setFeedbackType} />
                            ) : (
                                <FeedbackContentsStep onFeedbackSent={() => {
                                    console.log("entrou aq")
                                    setFeedbackSent(true)
                                
                                }} handleRestartFeedback={handleRestartFeedback} feedbackType={feedbackType} />
                            )
                        }
                    </>
                )
            }
            
        </div>
    )
}