/**
 * HomeController
 * 2015-08-21 02:08:38
 * 
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import {Bigpipe} from './Bigpipe'


function hotArticlePipe(bp){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'hotArticleList': {}
        }

        bp.res.render('sidebar/hot_article', rdata, (err, html)=>{

            bp.render('#sidebar_hot_article', html)

            resolve()
        })
    })

}


function hotTagPipe(bp){
    return queryHotTag()
    .then(data=>{
        return new Promise((resolve, reject)=>{
            let rdata = {
                'hotTagList': data
            }
            
            bp.res.render('sidebar/hot_tag', rdata, (err, html)=>{

                bp.render('#sidebar_hot_tag', html)
                resolve()
            })
            

        })
    })
}


function homeArticlePipe(bp){
    return queryArticle()
    .then(data=>{
        return new Promise((resolve, reject)=>{
            let rdata = {
                'articleList': data
            }
            bp.res.render('home/phome_article', rdata, (err, html)=>{

                bp.render('.wrap > .content', html)
                resolve()
            })
        })
    })
}


export default {

    pindex (req, res, next, page=1){
        let bp = new Bigpipe('karatBP', req, res)

        bp.start('home/phome')
        .pipe([
            homeArticlePipe,
            hotArticlePipe, 
            hotTagPipe
        ])
        .end()
    },


}

