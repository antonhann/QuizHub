export const Terms = (props) => {
    const{
        term,
        answer
    } = props
    return(
        <div className="studySetTerms">
            <div>{term}</div>
            <div>{answer}</div>
        </div>
    )
}