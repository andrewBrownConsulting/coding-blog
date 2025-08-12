export function parseArticle(article) {

    let parsedArticle = article?.map((sect, index) => {
        if (sect.charAt(0) === '#')
            return <h2 key={index}>{sect.replace(/#/g, "")}</h2>
        else
            return <p key={index}>{sect}</p>
    })
    return parsedArticle;
}