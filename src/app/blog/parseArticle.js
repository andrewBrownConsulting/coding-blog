
export function parseArticle(article) {

    let parsedArticle = article?.map((sect, index) => {
        if (sect.charAt(0) === '#')
            return <h2 className='article-header' key={index}>{sect.replace(/#/g, "")}</h2>
        if (sect.startsWith('image:')) {
            const source = sect.split("image:")[1];
            return <img key={index} src={'https://images.andrewb.site/images/' + source + '?api_key=1234'} />
        }
        else {
            //look for _text_ blocks
            let replaced = sect.split(/(_.*?_)/g).map((substr, subindex) => (
                /_(.*?)_/.test(substr) ?
                    <em key={subindex}>{substr.slice(1, -1)}</em> :
                    <span key={subindex}>{substr}</span>
            ))
            return <p className="article-text" key={index}>{replaced}</p>
        }
    })
    return parsedArticle;
}