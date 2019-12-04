import React from "react"
import "./css/home.css"
import axios from "axios"
import tou from "../images/1.jpg"
import { Carousel, WingBlank } from 'antd-mobile';
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: {},
            imgHeight: "30rem",
            datalist: [],
            date: "",
            falg: false,
        }
    }

    render() {
        let mount = "";
        if (this.state.data.date) {
            switch (Number(this.state.data.date.slice(4, 6))) {
                case 1: mount = "一月"; break;
                case 2: mount = "二月"; break;
                case 3: mount = "三月"; break;
                case 4: mount = "四月"; break;
                case 5: mount = "五月"; break;
                case 6: mount = "六月"; break;
                case 7: mount = "七月"; break;
                case 8: mount = "八月"; break;
                case 9: mount = "九月"; break;
                case 10: mount = "十月"; break;
                case 11: mount = "十一月"; break;
                case 12: mount = "十二月"; break;
                default:
                    break;
            }
        };
        return (
            <div>
                {this.state.isLoading ?
                    <div></div> :
                    <div className="home">
                        <div className="header">
                            <div className="date">
                                <span>{this.state.data.date.slice(6)}</span>
                                <span>{mount}</span>
                            </div>
                            <div className="title">首页</div>
                            {/* {
                                this.state.num.map((val)=>{
                                return <span>{val}</span>
                                })
                            } */}
                            <div className="tou" onClick={() => { this.my() }}><img src={tou} alt="头像" /></div>
                        </div>
                        <WingBlank>
                            <Carousel
                                autoplay={true}
                                infinite
                                dotStyle={{ height: "0.1rem", width: "0.1rem" }}
                                dotActiveStyle={{ height: "0.1rem", width: "0.3rem", backgroundColor: "white", borderRadius: "0.1rem" }}

                            >
                                {this.state.data.top_stories.map((val, index) => (
                                    <div
                                        key={index}
                                        onClick={() => { this.go(val.id) }}
                                        style={{ display: 'block', width: '100%', height: this.state.imgHeight, position: "relative" }}
                                    >
                                        <img
                                            src={val.image}
                                            alt="11"
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                        <p className="titletxt">{val.title}</p>
                                        <p className="author">{val.hint}</p>
                                    </div>
                                ))}
                            </Carousel>
                        </WingBlank>
                        <ul>
                            {
                                this.state.data.stories.map(val => {
                                    return (<li id={"id" + val.id} key={val.id} onClick={() => { this.go(val.id) }}>
                                        <div className="left">
                                            <h3 style={this.getLocalStorage(val.id, "id") ? { color: "#9e9d9d" } : { color: "black" }} >{val.title}</h3>
                                            <p>{val.hint}</p>
                                        </div>
                                        <div className="right">
                                            <img src={val.images} alt={val.title} />
                                        </div>
                                    </li>)
                                })
                            }
                        </ul>
                        {
                            this.state.datalist.map((val, index) => {
                                return (<div key={index}>
                                    <fieldset key={index}>
                                        <legend >{val.date.slice(4, 6) + "月" + val.date.slice(6) + "日"}</legend>
                                    </fieldset>
                                    {
                                        <ul>
                                            {val.stories.map(val => {
                                                return (<li id={"id" + val.id} key={val.id} onClick={() => { this.go(val.id) }}>
                                                    <div className="left">
                                                        <h3 style={this.getLocalStorage(val.id, "id") ? { color: "#9e9d9d" } : { color: "black" }}>{val.title}</h3>
                                                        <p>{val.hint}</p>
                                                    </div>
                                                    <div className="right">
                                                        <img src={val.images} alt="图片飞了" />
                                                    </div>
                                                </li>)
                                            })}
                                        </ul>
                                    }
                                </div>)
                            })
                        }
                    </div>
                }
            </div>
        )
    };
    my() {
        this.props.history.push({
            pathname: "/my"
        })
    }
    go(id) {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        window.onscroll = null
        this.props.history.push({
            pathname: "/content",
            state: {
                id,
                heightT: scrollTop,
            }
        })
        let data = this.state.datalist;
        data = JSON.stringify(data)
        this.pushLocalStorage(data, "data", true)
        this.pushLocalStorage(this.state.date, "date", true)
        this.pushLocalStorage(id, "id", false)
    };
    //把浏览过的id加到本地存储中
    pushLocalStorage(val, name, a) {
        if (a) {
            localStorage.setItem(name, val);
        } else {
            let str = localStorage.getItem(name) || "[]";
            str = JSON.parse(str);
            let bool = str.some((valS) => valS === val);
            if (!bool) {
                str.push(val);
                localStorage.setItem(name, JSON.stringify(str));
            }
        }
    };
    //查找被浏览过的ID
    getLocalStorage(id, name) {
        let str = localStorage.getItem(name) || "[]";
        str = JSON.parse(str);
        let bool = str.some((val) => val === id);
        return bool
    };
    componentDidMount() {
        let arr = [];
        //下滑加载
        const loader = (bool = false) => {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let sTOP = scrollTop + document.documentElement.clientHeight
            let sH = document.documentElement.scrollHeight;
            sTOP = Math.ceil(sTOP)
            if ((this.state.falg && sTOP >= (sH - 200)) || bool) {
                this.setState({
                    falg: false
                })
                axios({
                    url: `/api/4/news/before/${this.state.date}`
                }).then(res => {
                    arr.push(res.data);
                    this.setState({
                        datalist: arr,
                        date: res.data.date,
                        falg: true,
                    })
                })
            }
        }
        /*
        *初始化数据 和 返回时数据初始  用这两个属性定位到上次浏览的地方  切换时在新的组件中清minHeight minHeight是作用于整个页面
        * document.body.style.minHeight = document.documentElement.clientHeight + Math.ceil(heightT) +"px";
        * document.documentElement.scrollTop = Math.ceil(heightT);
        */
        axios({
            url: "/api/4/news/latest"
        }).then((res) => {
            this.setState({
                data: res.data,
                date: res.data.date,
                isLoading: false,
                falg: true,
            });
            if (this.props.location.query) {
                let { heightT } = this.props.location.query;
                document.body.style.minHeight = document.documentElement.clientHeight + Math.ceil(heightT) + "px";
                // console.log( document.body.scrollTop) //pc端有document.body.scrollTop值
                // document.body.scrollTop >= 0 ? document.body.scrollTop = Math.ceil(heightT) : document.documentElement.scrollTop = Math.ceil(heightT);
                document.body.scrollTop = Math.ceil(heightT);
                document.documentElement.scrollTop = Math.ceil(heightT);
                let datalist = localStorage.getItem("data");
                let date = localStorage.getItem("date");
                datalist = JSON.parse(datalist);
                this.setState({
                    datalist,
                    date,
                    // num :document.documentElement.scrollTop
                    //http://192.168.42.76:3000/
                })
                //把存在localStorage 中的数据存到 arr 解决下拉时页面重新加载
                // datalist.map(vale=>{
                //     arr.push(vale)
                // })
                arr = arr.concat(datalist)
                /**
                 * 处理浏览过的li的样式
                 */
                // getLocalStorage()
            } else {
                setTimeout(() => {
                    loader(true)
                }, 500);
            }
        });
        window.onscroll = () => {
            loader()
        }
    };
}
export default Home