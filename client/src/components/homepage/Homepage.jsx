import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../../services/cryptoApi";
import Cryptocurrencies from "../cryptocurrencies/Cryptocurrencies.tsx";
import News from "../news/News";
import Loader from "../loader/Loader";
import "./Homepage.css";
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  console.log(globalStats.total24hVolume);

  return (
    <>
      <Title level={2} className="heading home-title">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]} className="home-title">
        <Col span={4}>
          {" "}
          <Statistic
            span={6}
            title="Total Cryptocurrencies"
            value={globalStats.total}
          />
        </Col>
        <Col span={4}>
          {" "}
          <Statistic
            span={12}
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={4}>
          {" "}
          <Statistic
            span={12}
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={4}>
          {" "}
          <Statistic
            span={6}
            title="Total 24h Volume "
            // value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={4}>
          {" "}
          <Statistic
            span={12}
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
