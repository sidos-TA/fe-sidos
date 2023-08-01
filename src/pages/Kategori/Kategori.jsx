/* eslint-disable react-hooks/exhaustive-deps */
import {
  Col,
  Collapse,
  FloatButton,
  Form,
  List,
  Row,
  Tooltip,
  Typography,
} from "antd";
import {
  Fragment,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  QuestionCircleFilled,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import AHPContext from "../../context/AHPContext";
import roundUp3 from "../../lib/src/helpers/roundUp3";
import TitlePage from "../../components/TitlePage";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import { dataAHP } from "../../constants/dataAHP";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import { useNavigate } from "react-router-dom";

const QComponents = lazy(() => import("./QComponents"));
const Kategori = () => {
  const { Title, Text } = Typography;

  let arrValueEigenVector = [];

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // const [stateQ2, setStateQ2] = useState(dataAHP);
  const [stateQ2, setStateQ2] = useState([]);
  const [valueEigenVector, setValueEigenVector] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateKategoriHandler = useCallback(() => {
    const arrDatas = [];
    for (let i = 0; i < stateQ2?.length; i++) {
      arrDatas?.push({
        id: `K${i + 1}`,
        name: form?.getFieldValue(`kriteria${i + 1}`),
        benefitCost: form?.getFieldValue(`benefitCost${i + 1}`),
        code: `K${i + 1}`,
        skala: JSON.stringify(stateQ2[i]?.skala || "{}"),
        stringSkala: JSON.stringify(stateQ2[i]?.stringSkala || "{}"),
        bobot: valueEigenVector[i],
      });
    }
    return { arrDatas };
  }, [form.getFieldsValue()]);

  const customFetchHandler = useCallback(
    (formData) => {
      const arrDatasSkala = [];
      for (let i = 0; i < formData?.length; i++) {
        form?.setFieldsValue({
          [`kriteria${i + 1}`]: formData[i]?.name,
          [`benefitCost${i + 1}`]: formData[i]?.benefitCost,
        });
        arrDatasSkala?.push({
          skala: JSON.parse(formData?.[i]?.skala),
          stringSkala: JSON.parse(formData?.[i]?.stringSkala),
        });
      }
      setLoading(false);
      setStateQ2(arrDatasSkala);
    },
    [stateQ2]
  );

  const stopLoadingHandler = useMemo(() => {
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    stopLoadingHandler;
  }, []);
  return (
    <Fragment>
      <TitlePage title="Kategori" />

      {loading ? (
        <LoadingSidos style={{ height: "50vh" }} />
      ) : (
        <AHPContext.Provider
          value={{
            stateQ2,
            setStateQ2,
            arrValueEigenVector,
            setValueEigenVector,
            valueEigenVector,
          }}
        >
          <FormSidos
            form={form}
            submitEndpoint="updateKategori"
            endpoint="getAllKategori"
            customFetch={(formData) => customFetchHandler(formData)}
            beforeSubmit={updateKategoriHandler}
            afterMessageActionClose={() => {
              navigate("/kategori");
            }}
          >
            <Suspense fallback={<LoadingSidos style={{ height: "100vh" }} />}>
              {stateQ2?.map((item, index) => (
                <QComponents key={index + 1} item={item} idxItem={index + 1} />
              ))}
            </Suspense>

            <FloatButton.Group
              trigger="click"
              type="primary"
              style={{
                right: 24,
              }}
              icon={<CustomerServiceOutlined />}
            >
              <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: 50 }}
              >
                <Col
                  span="auto"
                  style={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    boxShadow: "10px -10px 35px 16px rgba(222, 243, 255, 1)",
                  }}
                >
                  <Collapse>
                    <Collapse.Panel header="Bobot Kategori" key="1">
                      <Row>
                        <Col span={24}>
                          <Typography.Text>Bobot Kategori : </Typography.Text>
                        </Col>
                        <Col span={24}>
                          <List>
                            {valueEigenVector?.map((data, idx) => {
                              return (
                                <List.Item key={idx}>
                                  K{idx + 1} : {roundUp3(data)}
                                </List.Item>
                              );
                            })}
                          </List>
                        </Col>
                      </Row>
                    </Collapse.Panel>
                  </Collapse>
                  <Row align="middle">
                    <Col span={2}>
                      <Tooltip title="Bobot masing-masing kriteria akan dikatakan stabil kalau Consistency Ratio (CR) kecil dari 0.1">
                        <QuestionCircleFilled
                          style={{
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </Col>
                    <Col span={22}>
                      <Row>
                        <Col span={24}>
                          <Title level={4}>
                            Status Bobot prioritas :
                            <span
                              style={{
                                color: stateQ2?.[0]?.CR < 0.1 ? "green" : "red",
                              }}
                            >
                              {stateQ2?.[0]?.CR < 0.1
                                ? "Stabil"
                                : "Tidak Stabil"}
                            </span>
                          </Title>
                        </Col>
                        <Col span={24}>
                          <Text style={{ fontSize: 16 }}>
                            Consistency Ratio : {stateQ2?.[0]?.CR}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FloatButton.Group>
          </FormSidos>
        </AHPContext.Provider>
      )}
    </Fragment>
  );
};

export default Kategori;
