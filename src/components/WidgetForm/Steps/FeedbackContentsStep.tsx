import { ArrowLeft } from "phosphor-react"
import { FormEvent, useState } from "react"
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScreenshotButton"
import { FeedbackType, feedbackTypes } from "../WidgetForm"

interface FeedbackContentsStepProps {
    feedbackType: FeedbackType;
    handleRestartFeedback: () => void;
    onFeedbackSent: () =>void;
}

export function FeedbackContentsStep({feedbackType, handleRestartFeedback, onFeedbackSent} : FeedbackContentsStepProps){

    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault()

        setIsSendingFeedback(true)

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false)

        onFeedbackSent()
    }

    return(
        <>
            <header>
                <button type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={handleRestartFeedback}>
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <span className="text-xl leading-6">
                    <img src={feedbackTypeInfo.source} alt={feedbackTypeInfo.alt} />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
               <textarea 
                    className="min-w[384px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={e => setComment(e.target.value)}
               />  
               <footer className="flex gap-2 mt-2">
                    <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />
                    <button disabled={comment.length === 0 || isSendingFeedback} type="submit" className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                        { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
                    </button>
                    Feito com ❤️ pela <a className="underline underline-offset-2" href="#">Rocketseat/Isabela Aquino</a> 
               </footer>
            </form>

        </>
    )
}