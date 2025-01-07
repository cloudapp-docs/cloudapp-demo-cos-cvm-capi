import 'tea-component/dist/tea.css';

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, List, MetricsBoard, Row } from 'tea-component';
import { SingleFileUpload } from './SingleFileUpload';

export default function App() {
  const [data, setData] = useState({
    TotalCount: '-',
    RunningCount: '-',
    IsolationCount: '-',
    WillExpireCount: '-',
  });

  const [instances, setInstances] = useState<any[]>();

  useEffect(() => {
    fetch('/api/GetLoadBalanceOverview').then((x) => {
      console.log('clb balance x: ', x);
    });

    fetch('/api/DescribeInstances').then((x) => {
      console.log('cvm instances x: ', x);
    });
  }, []);

  return (
    <Card>
      <Card.Body title="我的负载均衡">
        <Row showSplitLine>
          <Col>
            <MetricsBoard title="总数" value={data.TotalCount} unit="个" />
          </Col>
          <Col>
            <MetricsBoard title="运行中" value={data.RunningCount} unit="个" />
          </Col>
          <Col>
            <MetricsBoard
              title="已隔离"
              value={data.WillExpireCount}
              unit="个"
            />
          </Col>
          <Col>
            <MetricsBoard
              title="即将过期"
              value={data.WillExpireCount}
              unit="个"
            />
          </Col>
        </Row>
      </Card.Body>

      <Card.Body title='CVM 实例列表'>
        <List>
        {
          instances?.map(instance => (
            <List.Item>{`${instance.InstanceId} ${instance.InstanceName}`}</List.Item>
          ))
        }
        </List>
      </Card.Body>

      <Card.Body title="文件上传">
        <SingleFileUpload isValidate={true} />
      </Card.Body>

      <Card.Body title="文件上传（无权限）">
        <SingleFileUpload isValidate={false} />
      </Card.Body>
    </Card>
  );
}
