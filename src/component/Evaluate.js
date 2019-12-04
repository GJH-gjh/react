import React from "react"
import axios from "axios"
import "./css/evaluate.css"
class Evaluate extends React.Component {
    constructor() {
        super()
        this.state = {
            num: 0,
            dataS: [],
            dataL: [],
            copy: "",
            el: null,
            tetx: ".展开全文",
            falg:true
        }
    };


    render() {
        return (
            <div className="evaluate" onClick={(e) => { this.close(e) }}>
                <header className="clearfix">
                    <p>{this.state.num}条评论</p>
                    <span class="iconfont icon-icon-test2" onClick={() => { this.go() }}></span>
                </header>
                {
                    this.state.dataL.length === 0 ? <div></div> : <div className="contentL">
                        <h3 id="w">
                            {this.state.dataL.length}条长评
                        </h3>
                        <ul>
                            {

                                this.state.dataL.map((val, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={val.avatar} alt="1" />
                                            <div>
                                                <div>
                                                    <span>{val.author}</span>
                                                    <div>
                                                        <textarea ></textarea>
                                                        <p onClick={(e) => { this.copy(e, val.content) }}>复制</p>
                                                        <p>举报</p>
                                                    </div>
                                                    <span onClick={(e) => { this.open(e) }}>···</span>
                                                </div>
                                                <div>
                                                    <p>
                                                        {val.content}
                                                    </p>
                                                    {val.reply_to ? <p>//{val.reply_to.author}：{val.reply_to.content}</p>:false}
                                                </div>
                                                <div>
                                                    <span>{this.setDate(val.time)}  </span>
                                                    <span class="iconfont icon-iconfontduihua"></span>
                                                    <span class="iconfont icon-dianzan"></span>
                                                    <span>{val.likes}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
                {
                    this.state.dataS.length === 0 ? <div></div> : <div className="contentS">
                        <h3>
                            {this.state.dataS.length}条短评
                        </h3>
                        <ul>
                            {
                                this.state.dataS.map((val, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={val.avatar} alt="1" />
                                            <div>
                                                <div >
                                                    <span>{val.author}</span>
                                                    <div>
                                                        <textarea></textarea>
                                                        <p onClick={(e) => { this.copy(e, val.content) }}>复制</p>
                                                        <p>举报</p>
                                                    </div>
                                                    <span onClick={(e) => { this.open(e) }}>···</span>
                                                </div>
                                                <div>
                                                    <p>
                                                        {val.content}
                                                    </p>
                                                    {val.reply_to ? <p className={this.state.falg?"px1":"px2"}>//{val.reply_to.author}：{val.reply_to.content}</p>: false }                
                                                </div>
                                                <div>
                                    <span>{this.setDate(val.time)}{val.reply_to ?  <span>{ this.state.tetx}</span> : false}</span>
                                                    <span class="iconfont icon-iconfontduihua"></span>
                                                    <span class="iconfont icon-dianzan"></span>
                                                    <span>{val.likes}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
                <p>以显示全部评价</p>
            </div>
        )
    };
    close(e) {
        if (this.setState.el) {
            this.setState.el.style.display = "none";
            e.stopPropagation();
        }
    }
    open(e) {
        e.target.previousSibling.style.display = "block";
        this.setState.el = e.target.previousSibling;
        e.stopPropagation();
    }
    copy(e, val) {
        let inp = e.target.previousSibling;
        inp.value = val;
        inp.select();
        document.execCommand("copy");
    }
    setDate(x) {
        let date = new Date();
        let dateDate = new Date(x * 1000);
        let day = "";
        if (dateDate.toDateString() === date.toDateString()) {
            day = "今天"
        } else {
            day = `${dateDate.getMonth() + 1}-${dateDate.getDate()}`
        }
        let string = day;
        let time = `${dateDate.getHours()}:${dateDate.getMinutes()}`
        return `${string} ${time}`
    }
    go() {
        this.props.history.go(-1)
    }
    axiosRequest = (url, method = "get") => {
        return axios({
            url,
            method,
        })
    }
    componentDidMount() {
        let { id } = this.props.location.state;
        //使用 async  await 可以实现 dataS dataL 值都拿到了在执行下一步 但是 async是异步的 await是等待代码会在这一行停止
        const getData = async () => {
            let dataL = await this.axiosRequest(`/api/4/story/${id}/long-comments`)
            let dataS = await this.axiosRequest(`/api/4/story/${id}/short-comments`)
            console.log(dataS.data.comments, dataL.data.comments)
            this.setState({
                dataS: dataS.data.comments,
                dataL: dataL.data.comments,
                num: dataS.data.comments.length + dataL.data.comments.length
            })
        };
        getData()
    }
}
export default Evaluate