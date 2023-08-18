import { Col, Form, Row, Select, Tooltip, Typography } from "antd";
import { Suspense } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { consIndexDatas } from "../../constants/cosIndexDatas";
import skalaDataAHP from "../../constants/skalaDataAHP";
import { useAHPContext } from "../../context/AHPContext";
import extractNum from "../../lib/src/helpers/extractNum";
import sumAllArrDatas from "../../lib/src/helpers/sumAllArrDatas";

const { Text } = Typography;
const InputNumberAHP = ({ item, idxItem, valueForm }) => {
  let totalEachKriteria = {};
  let timeout;

  const {
    form,
    arrValueEigenVector,
    stateQ2: state,
    setStateQ2: setState,
    setValueEigenVector,
  } = useAHPContext();

  const newValueOfSkalaChanged = (data, skalaData, value) => ({
    ...data?.skala,
    [skalaData]: value,
  });
  const newValueStringSkalaChanged = (data, skalaData, value) => ({
    ...data?.stringSkala,
    [skalaData]: value?.toString(),
  });

  const newValueOfSkalaTargetted = (data, value) => {
    return {
      ...data?.skala,
      [`K${idxItem}`]: 1 / value,
    };
  };
  const newValueStringSkalaTargetted = (data, value) => {
    return {
      ...data?.stringSkala,
      [`K${idxItem}`]: `1/${value}`,
    };
  };

  const totalSkalaHandler = (arr) => sumAllArrDatas(arr);

  const totalSkalaPerKriteria = () => {
    state?.forEach((item) => {
      Object?.keys(item?.skala)?.forEach((KCode) => {
        totalEachKriteria[KCode] = sumAllArrDatas(
          state?.map((dataState) => dataState?.skala?.[KCode])
        );
      });
    });
  };

  const AHPCalculateHandler = () => {
    totalSkalaPerKriteria();

    const eigenVectorPerData = Object.keys(item?.skala).reduce((acc, key) => {
      acc[key] = item?.skala[key] / totalEachKriteria?.[key];
      return acc;
    }, {});

    if (arrValueEigenVector?.length + 1 <= state?.length) {
      arrValueEigenVector?.push(
        sumAllArrDatas(Object?.values(eigenVectorPerData)) / state?.length
      );
    }

    // setValueEigenVector(arrValueEigenVector?.map((data) => roundUp3(data)));
    setValueEigenVector(arrValueEigenVector);

    const lambdaMax = arrValueEigenVector?.reduce((total, data, index) => {
      return (total += data * totalEachKriteria[`K${index + 1}`]);
    }, 0);

    const consistencyIndex = (lambdaMax - state?.length) / (state?.length - 1);

    const consistencyRatio =
      consistencyIndex /
      consIndexDatas?.find((ciData) => ciData?.n === state?.length)?.IR;

    setState(
      state?.map((data) => ({
        ...data,
        // CR: roundUp3(consistencyRatio),
        CR: consistencyRatio,
      }))
    );
  };

  const onChangeSkala = (value, skalaData) => {
    const newValue = state?.map((data, index) => {
      if (index + 1 === idxItem) {
        return {
          ...data,
          skala: newValueOfSkalaChanged(data, skalaData, value),
          stringSkala: newValueStringSkalaChanged(data, skalaData, value),
          [`totalSkalaK${idxItem}`]: totalSkalaHandler(
            Object.values(newValueOfSkalaChanged(data, skalaData, value))
          ),
        };
      } else if (index + 1 === extractNum(skalaData)) {
        return {
          ...data,
          skala: newValueOfSkalaTargetted(data, value),
          stringSkala: newValueStringSkalaTargetted(data, value),
          [`totalSkalaK${idxItem}`]: totalSkalaHandler(
            Object.values(newValueOfSkalaTargetted(data, value))
          ),
        };
      }
      return data;
    });

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setState(newValue);
    }, 250);
  };

  useEffect(() => {
    AHPCalculateHandler();
  }, [JSON.stringify(state)]);

  return (
    <Fragment>
      {Object?.entries(item?.skala)?.map((skala, skalaIdx) => {
        return (
          <Row
            gutter={[8, 8]}
            align="middle"
            justify="center"
            key={skala}
            style={{ marginBottom: 15 }}
          >
            <Tooltip title={valueForm?.[`kriteria${skalaIdx + 1}`]}>
              <Col span="auto">{skala?.[0]}</Col>
            </Tooltip>
            <Col span={6}>
              <Text keyboard>{item?.stringSkala?.[skala[0]]}</Text>{" "}
            </Col>

            <Col span={14}>
              <Select
                showSearch
                onChange={(value) => onChangeSkala(value, skala?.[0])}
                options={skalaDataAHP}
                defaultValue={skala[1]}
                {...(`K${idxItem}` === skala[0] && {
                  disabled: true,
                })}
              />
            </Col>
          </Row>
        );
      })}
    </Fragment>
  );
};

export default InputNumberAHP;
