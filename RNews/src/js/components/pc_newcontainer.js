import React from 'react';
import reactDOM from 'react-dom';
import {Row, Col, Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCnewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_products';
export default class PCNewsContainer extends React.Component{
  render(){
    const settings = {
       dots:true,
       infinite:true,
       speed: 500,
       slidesToShow:1,
       autoplay:true
   };
    return(
      <div>
      <Row>
        <Col span={2}></Col>
        <Col span={20} className="container">
        	<Row>
        	<Col span={9}>
		          <div className="leftContainer">
		            <div className="carousel">
		              <Carousel {...settings}>
		                <div><img src="./src/images/carousel_1.png"/></div>
		                <div><img src="./src/images/carousel_2.png"/></div>
		                <div><img src="./src/images/carousel_3.png"/></div>
		                <div><img src="./src/images/carousel_4.png"/></div>
		              </Carousel>
		            </div>
		            <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="112px"/>
		          </div>
		     </Col>
		     <Col span={9}>
		          <Tabs className="tab_news">
		              <TabPane tab="头条新闻" key="1">
		                <PCnewsBlock count={22} type="top" width="100%" bordered="false"/>
		              </TabPane>
		              <TabPane tab="国际新闻" key="2">
		                <PCnewsBlock count={22} type="guoji" width="100%" bordered="false"/>
		              </TabPane>
		              <TabPane tab="社会新闻" key="3">
		                <PCnewsBlock count={22} type="shehui" width="100%" bordered="false"/>
		              </TabPane>
		              <TabPane tab="娱乐新闻" key="4">
		                <PCnewsBlock count={22} type="yule" width="100%" bordered="false"/>
		              </TabPane>
		              <TabPane tab="体育新闻" key="5">
		                <PCnewsBlock count={22} type="tiyu" width="100%" bordered="false"/>
		              </TabPane>
		              <TabPane tab="科技新闻" key="6">
		                <PCnewsBlock count={22} type="keji" width="100%" bordered="false"/>
		              </TabPane>
		              <TabPane tab="时尚新闻" key="7">
		                <PCnewsBlock count={22} type="shishang" width="100%" bordered="false"/>
		              </TabPane>
		          </Tabs>
		          </Col>
		          <Col span={1}>
		          </Col>
		         <Col span={5}>
		    	 		<Tabs className="tabs_product">
								<TabPane tab="R News 产品" key="1">
									<PCProduct/>
								</TabPane>
							</Tabs>
							</Col>
		          <div>
									<PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="132px"/>
									<PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="132px"/>
								</div>
					 </Row>
        </Col>
        <Col span={2}></Col>
      </Row>
      </div>
    )
  }
}
