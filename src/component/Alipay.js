import React from "react";
import ReactDOM from "react-dom";
import { Button, message, Icon, Radio } from "antd";
import Clipboard from "clipboard";
import styled from "styled-components";
import { apis, axios, qs } from "../api";

const Container = styled.div`
  position: relative;
  background: #fff;
  display: inline-block;
  z-index: 100;
`;

const Image = styled.div`
  position: absolute;
  left: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  display: none;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);

  div {
    text-align: center;
    padding: 10px 10px 0;
  }
`;

const RmbButton = styled(Button)`
  &:hover ${Image} {
    display: block;
  }
`;

const RedButton = styled(RmbButton)`
  color: #fff;
  background-color: #ff4d4f;
  border-color: #ff4d4f;
`;

const Zhouka = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background: #fff;
  display: fixed;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default class Alipay extends React.Component {
  state = {
    showZhouka: false,
    application: 0,
    qrcode: ""
  };

  componentDidMount() {
    const clipboard = new Clipboard(ReactDOM.findDOMNode(this.refs.alibutton), {
      text: () => "aRhixt096d"
    });

    clipboard.on("success", e => {
      e.clearSelection();
      message.info(
        "打开支付宝即可领取红包（每天可以领一次）红包码：aRhixt096d"
      );
    });

    clipboard.on("error", e => {
      if (window.confirm("您的设备不支持复制红包码，是否跳转到支付宝领取？")) {
        window.location.href = "https://qr.alipay.com/c1x06611gnoczzqiklpka04";
      }
    });
  }

  render() {
    return (
      <Container>
        <Button.Group>
          <RmbButton
            type="primary"
            onClick={() => message.info("如果本站对您有帮助，欢迎打赏支持我们")}
          >
            <Icon type="pay-circle" />
            打赏
            <Image>
              <table>
                <tr style={{ color: "#222" }}>
                  <th>支付宝</th>
                  <th>微信</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src={require("../static/zfb.png")}
                      width="190"
                      alt="打赏 支付宝支付"
                    />
                  </td>
                  <td>
                    <img
                      src={require("../static/wx.png")}
                      width="190"
                      alt="打赏 微信支付"
                    />
                  </td>
                </tr>
              </table>
            </Image>
          </RmbButton>
          <RmbButton type="primary" ref="alibutton">
            <Icon type="alipay-circle" />
            红包
            <Image>
              <img
                src={require("../static/hongbao1.jpg")}
                width="290"
                alt="支付宝 每天领红包"
              />
            </Image>
          </RmbButton>
        </Button.Group>
        <Button.Group style={{ marginLeft: 20 }}>
          <RedButton
            type="danger"
            onClick={() => this.setState({ showZhouka: true })}
          >
            付费周卡
          </RedButton>
        </Button.Group>
        {this.state.showZhouka && (
          <Zhouka>
            <div>
              <h1>8.88元 付费周卡(7天)</h1>
              <p>
                付款后1分钟内生效，请刷新查看次数，支持叠加购买
                <br />
                不支持退款，包括美团、饿了么和谐等因素
              </p>
              <Radio.Group
                onChange={event =>
                  this.setState({ application: event.target.value })
                }
                value={this.state.application}
                style={{ marginBottom: "12px" }}
              >
                <Radio value={0}>美团周卡-每天获得20次</Radio>
                <br />
                <Radio value={1} style={{ margin: "10px 0" }}>
                  饿了么周卡-每天获得50次
                </Radio>
              </Radio.Group>
              <br />
              <div>
                <Button
                  type="danger"
                  onClick={() => this.setState({ showZhouka: false })}
                >
                  取消
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={() => this.wxPay()}>
                  微信支付
                </Button>
              </div>
              <br />
              <br />
              {this.state.qrcode && (
                <img
                  src={this.state.qrcode}
                  width={200}
                  height={200}
                  alt="微信付款码"
                />
              )}
            </div>
          </Zhouka>
        )}
      </Container>
    );
  }

  async wxPay() {
    if (this._wxPay) {
      return;
    }
    this._wxPay = true;
    try {
      const { data, message } = await axios.post(
        apis.createPay,
        qs.stringify({
          type: "native",
          user_id: this.props.user.id,
          application: this.state.application
        })
      );
      if (message) {
        return message.error(message);
      }
      this.setState({ qrcode: data });
    } catch (e) {
      message.error(e.message);
    } finally {
      this._wxPay = false;
    }
  }
}
