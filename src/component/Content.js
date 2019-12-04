import React from "react"
import axios from "axios"
import "../iconfont/iconfont.css"
import "./css/content.css"
class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
        }

    }
    render() {
        return (
            <div>
                <link rel="stylesheet" href={this.state.data.css} />
                <div dangerouslySetInnerHTML={{ __html: this.state.data.body }} />
                <div className="footer">
                    <span class="iconfont icon-icon-test2" onClick={()=>{this.goHome()}}></span>
                    <span class="iconfont icon-iconfontduihua" onClick={()=>{this.goEvaluate()}}>123</span>
                    <span class="iconfont icon-dianzan"></span>
                    <span class="iconfont icon-shoucang" onClick={(e)=>{this.setCollect(e,this.state.data.id)}} ></span>
                    <span class="iconfont icon-shangchuan"></span>
                </div>
            </div>
        );
    }
    setCollect(e,id){
        let bool = e.target.style.color
        if(bool === "red"){
            bool = "black"
            let arr = localStorage.getItem("shoucang") || "[]"
            arr = JSON.parse(arr)
            arr.splice(arr.indexOf(id),1)
            localStorage.setItem("shoucang",JSON.stringify(arr))
        }
        else{
            bool = "red";
            console.log(typeof id)
            let arr = localStorage.getItem("shoucang") || "[]"
            arr = JSON.parse(arr)
            arr.push(id)
            localStorage.setItem("shoucang",JSON.stringify(arr))
        }
        e.target.style.color = bool
    }
    goEvaluate(){
        let {id} = this.props.location.state;
        this.props.history.push({
            pathname: "/evaluate",
            state: {
                id,
            }
        })
    }
    goHome(){
        let {heightT} = this.props.location.state;
        this.props.history.push({
            pathname:"/home",
            query:{
                heightT,
            }
        })
    }
    componentDidMount() {
        let {id} = this.props.location.state;
        document.body.style.minHeight = 0
        // id = id.substring(2)
        axios({
            url: `/api/4/news/${id}`
        }).then(res => {
            this.setState({
                data: res.data
            })
            let box = document.querySelector(".img-place-holder");
            box.style.height = "auto";
            let imgD = document.createElement("img");
            imgD.src = this.state.data.image;
            box.appendChild(imgD);
        })
    }
}
export default Content