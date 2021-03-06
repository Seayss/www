import React from "react";
import ReactDOM from "react-dom";
import { Button, message, Icon, Radio } from "antd";
import Clipboard from "clipboard";
import styled from "styled-components";
import isWeixin from "is-weixin";
import { apis, axios, qs } from "../../api";

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

const Card = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
  background: #fff;
  display: fixed;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default class Pay extends React.Component {
  state = {
    showKa: false,
    application: 0,
    qrcode: "",
    wxPayLoading: false
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
    const cardName = this.state.card === "month" ? "月卡" : "周卡";

    return (
      <Container>
        <Button.Group style={{ marginBottom: 5, marginRight: 5 }}>
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
                      src={require("../../static/zfb.png")}
                      width="190"
                      alt="打赏 支付宝支付"
                    />
                  </td>
                  <td>
                    <img
                      src={require("../../static/wx.png")}
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
                src={require("../../static/hongbao1.jpg")}
                width="290"
                alt="支付宝 每天领红包"
              />
            </Image>
          </RmbButton>
        </Button.Group>
        <Button.Group>
          <RmbButton
            type="danger"
            onClick={() => this.setState({ showKa: true, card: "week" })}
          >
            付费周卡
          </RmbButton>
          <RmbButton
            type="danger"
            onClick={() => this.setState({ showKa: true, card: "month" })}
          >
            付费月卡
          </RmbButton>
        </Button.Group>
        {this.state.showKa && (
          <Card>
            <div>
              <h1>
                {this.state.card === "month" ? "18.88" : "8.88"}元 付费
                {cardName}({this.state.card === "month" ? 30 : 7}天)
              </h1>
              <p>
                付款后刷新页面查看次数，1分钟内生效，不支持退款
                <br />
                可叠加购买多次，单独计算
                {this.state.card === "month" ? "月" : "周"}卡时间
                <br />
                次数不累积到第二天，建议领到最大前一个囤包
              </p>
              <Radio.Group
                onChange={event =>
                  this.setState({ application: event.target.value })
                }
                value={this.state.application}
                style={{ marginBottom: "12px" }}
              >
                <Radio value={0}>美团{cardName}-每天获得20次</Radio>
                <br />
                <Radio value={1} style={{ margin: "10px 0" }}>
                  饿了么{cardName}-每天获得50次
                </Radio>
              </Radio.Group>
              <br />
              <div>
                <Button
                  type="danger"
                  onClick={() => this.setState({ showKa: false })}
                >
                  取消
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  type="primary"
                  loading={this.state.wxPayLoading}
                  onClick={() => this.wxPay()}
                >
                  微信支付
                </Button>
              </div>
              {this.state.qrcode && (
                <div>
                  <br />
                  <img
                    src={this.state.qrcode}
                    width={200}
                    height={200}
                    alt="微信付款码"
                  />
                  <p style={{ marginTop: 10 }}>
                    使用微信扫一扫付款
                    <br />
                    或者在微信环境中打开本站
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </Container>
    );
  }

  async wxPay() {
    if (this.state.wxPayLoading) {
      return;
    }
    this.setState({ wxPayLoading: true });
    try {
      const weixin = isWeixin(navigator.userAgent);
      const { data, message: message2 } = await axios.post(
        apis.createPay,
        qs.stringify({
          type: weixin ? "cashier" : "native",
          user_id: this.props.user.id,
          application: this.state.application,
          card: this.state.card
        })
      );
      if (message2) {
        return message.error(message2);
      }
      if (weixin) {
        window.location.href = data;
      } else {
        this.setState({ qrcode: data });
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      this.setState({ wxPayLoading: false });
    }
  }
}
