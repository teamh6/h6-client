import React from "react";
import classes from "./Exam.module.css";

export const Exam = () => {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          <h2>검수기준</h2>
        </div>
        <div className={classes.container}>
          <p className={classes.description}>
            {" "}
            HOWWATCH의 검수기준은 거래 당사자간 원활한 거래와 보다 균형있는 검수기준 확립을 위해
            지속적으로 업데이트 되고 있습니다. 거래에 앞서 최신 검수기준을 참고하시기 바랍니다.
            회원님께서 판매 또는 구매하신 모든 상품은 HOWWATCH의 전문 검수팀이 제품의 컨디션을
            꼼꼼하게 확인한 후, 검수 합격 시에만 출고하고 있습니다.
          </p>

          <p className={classes.description} style={{ color: "#f15746" }}>
            ※ 시계 거래 관련 주의사항 HOWWATCH의 정가품 판정 및 검수기준에 의한 기본 품질 확인을
            수행하고 있으나, 통신판매 중개자로서 제조업체의 제품별 보증에 대해서는 책임을 지지
            않습니다. 제품 기능에 관한 사항이나 기타 제품 관련 질문은 제조업체에 문의하시기
            바랍니다. 단, 제조업체의 A/S 여부는 보장하지 않습니다.
          </p>

          <p className={classes.description}>
            HOWWATCH의 검수기준으로 고지된 사항 이외 아래와 같이 제조사에서 불량으로 인정하지 않는
            기준, 또는 당사 검수기준에 따라 그 여부를 명확히 분별할 수 없는 상품의 경우 하자로
            판단하지 않으며,이로 인한 구매 취소는 불가하므로 신중한 거래 부탁드립니다.
          </p>

          <li>제조공정, 유통과정 또는 소재 특성 상 발생할 수 있는 사항 </li>

          <p className={classes.description}>
            고지드린 검수 기준으로 판정하기 모호한 상품 상태, 비특정적 상품 상태, 특정 모델의
            제조공정에 따른 개체차이와 관련하여서는{" "}
            <b> 검수센터 책임자의 최종 판단 하에 결정하게 됩니다.</b>
          </p>

          <p className={classes.description}>
            HOWWATCH의 검수기준에 동의하지 않으실 경우 거래가 불가하오니 거래 당사자는 거래에 앞서
            HOWWATCH의 검수기준을 반드시 검토하시기 바랍니다.
          </p>
        </div>
        <div className={classes.check}>
          <div>
            <h3>불합격/페널티 부과 사항 </h3>
            <ul>
              <li>
                <br />
                <div>
                  <table>
                    <colgroup>
                      <col style={{ width: "40%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">구분</th>
                        <th scope="col">불합격</th>
                        <th scope="col">
                          구매자 <br />
                          의사확인
                        </th>
                        <th scope="col">합격</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>
                          모조폼/가품 <p>상품, 박스, 구성품 등</p>
                        </th>
                        <td>
                          ○ <br />
                          <em>페널티 15%</em>
                          <br />
                          <em>이용정지</em>
                        </td>
                        <td>&#45;</td>
                        <td>&#45;</td>
                      </tr>
                      <tr>
                        <th>손상/오염/사용감</th>
                        <td>
                          ○ <br />
                          <em>페널티 15%</em>
                          <br />
                          <em>이용정지</em>
                        </td>
                        <td>&#45;</td>
                        <td>&#45;</td>
                      </tr>
                    </tbody>
                  </table>
                  <ul>
                    <li>
                      ※ 손상/오염/사용감 판정의 경우 사용으로 인한 손상, 분해 재조립 여부, 폴리싱
                      등의 기준을 종합하여 검수원과 검수센터 책임자의 최종 판단하에 결정하게 됩니다.
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.check2}>
          <h3>패키지 및 구성품 </h3>
          <div className={classes.title2}>
            <b> 박스(전체면적)</b>
          </div>
          <ul>
            <li>
              <br />
              <div>
                <table>
                  <colgroup>
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">구분</th>
                      <th scope="col">불합격</th>
                      <th scope="col">
                        구매자 <br />
                        의사확인
                      </th>
                      <th scope="col">합격</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>박스 누락/상이</th>
                      <td>○</td>
                      <td>&#45;</td>
                      <td>&#45;</td>
                    </tr>
                    <tr>
                      <th>박스 손상/기능상실</th>
                      <td>기능상실</td>
                      <td>손상</td>
                      <td>&#45;</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    ※ 최초 발매시 2중 박스로 구성되어 있는 제품의 경우 겉박스의 손상 및 오염은
                    검수기준 내 합격 처리됩니다.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className={classes.title2}>
            <b> 구성품 기준</b>
          </div>
          <ul>
            <li>
              <br />
              <div>
                <table>
                  <colgroup>
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">구분</th>
                      <th scope="col">불합격</th>
                      <th scope="col">
                        구매자 <br />
                        의사확인
                      </th>
                      <th scope="col">합격</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        필수 구성품 누락/상이 <p>보증서,보증서 케이스, 개런티 매뉴얼, 태그</p>
                      </th>
                      <td>○</td>
                      <td>&#45;</td>
                      <td>&#45;</td>
                    </tr>
                    <tr>
                      <th>필수 정보 유실</th>
                      <td>○</td>
                      <td>&#45;</td>
                      <td>&#45;</td>
                    </tr>
                    <tr>
                      <th>보호 캡/필름 누락</th>
                      <td>&#45;</td>
                      <td>&#45;</td>
                      <td>○</td>
                    </tr>
                  </tbody>
                </table>

                <ul>
                  <li>
                    ※ 랩핑, 기타 구성품(인보이스, 영수증 등) 및 타 업체 검수택의 경우 포함되는 것을
                    보장하지 않으며, 검수 중 제거될 수 있습니다.
                  </li>
                  <li>※ 보증서 상 스탬핑/서명 여부는 검수 기준에 포함되지 않습니다.</li>
                </ul>
              </div>
            </li>
          </ul>
          <div className={classes.title2}>
            <b> 제품 상태</b>
          </div>
          <ul>
            <li>
              <br />
              <div>
                <table>
                  <colgroup>
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">구분</th>
                      <th scope="col">불합격</th>
                      <th scope="col">
                        구매자 <br />
                        의사확인
                      </th>
                      <th scope="col">합격</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>상품 불일치</th>
                      <td>○</td>
                      <td>&#45;</td>
                      <td>&#45;</td>
                    </tr>
                    <tr>
                      <th>
                        손상<p>덴트, 긁힘</p>
                      </th>
                      <td>&#45;</td>
                      <td>○</td>
                      <td>&#45;</td>
                    </tr>
                    <tr>
                      <th>
                        여분 링크<p>사이즈 조절</p>
                      </th>
                      <td>여분 링크 누락</td>
                      <td>&#45;</td>
                      <td>여분 링크 동봉</td>
                    </tr>
                    <tr>
                      <th>기능/작동 불량</th>
                      <td>○</td>
                      <td>&#45;</td>
                      <td>&#45;</td>
                    </tr>
                    <tr>
                      <th>PPF 필름(보호 필름) 시공</th>
                      <td>&#45;</td>
                      <td>○</td>
                      <td>&#45;</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    ※ 외관 및 작동유무 등을 확인하기 위하여 보호 필름이나 랩핑 등은 검수 과정에서
                    제거될 수 있습니다.
                  </li>
                  <li>
                    ※ 오토매틱 시계의 무브먼트 특성상 시간 오차가 발생할 수 있으며, 위 기준에서
                    제외됩니다.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className={classes.container}>
          <h3>유의사항</h3>
          <p className={classes.description}>
            ※ '구매자 의사 확인'의 상품은 최초 보류 알림 기준 24시간 이내 회신이 없을 경우에 자동
            검수 합격 처리되며 이와 관련한 취소는 불가능합니다.
          </p>
          <p className={classes.description}>
            ※ 모조품/가품 판매 및 페널티 회피 시 해당 계정은 회원 자격이 정지되며, 새로운 아이디로
            가입을 하여도 이전 거래 기록을 근거로 서비스 이용을 제재할 수 있습니다.
          </p>
          <p className={classes.description}>
            ※ 국내 발매 제품/해외 발매 제품의 여부는 검수 불합격 사항이 아니며, 이로 인한 구매 취소
            또한 불가합니다.
          </p>
          <p className={classes.description}>
            ※ HOWWATCH을 통해 거래된 모든 상품은 입고 시 자동화 처리를 위해 고유의 정보를 포함한
            스티커가 부착됩니다. 부착 위치는 제품에 따라 차이가 있으며 이는 발송(반송) 시에도
            제거되지 않습니다.
          </p>
          <p className={classes.add_check}>
            <b>검수 불합격 시 반송 택배 운임</b>
          </p>
          <p className={classes.description} style={{ marginTop: "8px" }}>
            &#91;착불&#93;
          </p>
          <p className={classes.etc_desc}>검수 기준상 '불합격'에 해당하는 반송건</p>
          <p className={classes.description}>&#91;선불&#93;</p>
          <p className={classes.etc_desc}>'구매의사 확인' 이후 발생하는 반송건</p>
          <p className={classes.add_check}>
            <b>판매 관련</b>
          </p>
          <p className={classes.description} style={{ marginTop: "8px" }}>
            제품의 오리지널 박스와 브랜드 보증서가 필요하며, 보증서 상 스탬핑/서명 여부는 검수
            기준에 포함되지 않습니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 박스가 제기능을 할 수 없을 경우 불합격 처리됩니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 모든 액세서리(기본 구성 툴 등)가 동봉되어야 합니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 제조 및 취급/유통 시 발생할 수 있는 긁힘 등은 합격 처리됩니다.
          </p>
          <p className={classes.description}>
            HOWWATCH의 전문 검수팀이 시계의 정&#183;가품 확인을 마친 후 아래와 같은 항목을 점검해
            제품의 컨디션을 최종 확인합니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 러그, 케이스, 크리스탈 ,인덱스/다이얼, 브레슬릿 등 외부 상태 평가
          </p>
          <p className={classes.add_check}>
            {" "}
            <b>구매 관련</b>
          </p>
          <p className={classes.description} style={{ marginTop: "8px" }}>
            HOWWATCH에서 구입한 시계는 엄격한 검수를 통과한 정품임을 보증하는 HOWWATCH의 인증서가
            동봉됩니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 상품에 따라 외부 감정 기관을 통해 이중 검수를 진행할 수 있으며 이 경우 패키지에
            외부 감정 기관의 인증서가 포함됩니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 오리지널 박스와 브랜드 보증서(스탬핑/서명 여부 무관)는 함께 발송됩니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 일부 구성품은 발매 국가에 따라 상이할 수 있습니다. (필수 구성품: 보증서, 보증서
            케이스, 개런티 매뉴얼, 태그)
          </p>
          <p className={classes.etc_desc}>
            &#183; 브랜드 보증서는 일반적으로 양도가 불가한 점 참고 부탁드립니다.
          </p>
          <p className={classes.description}>
            거래되는 새상품은 철저한 검수 후 아래와 같이 안전하게 배송됩니다.
          </p>
          <p className={classes.etc_desc}>
            &#183; 상품을 알맞은 박스에 넣은 뒤 에어캡, 폼 패딩과 같은 완충제를 이용해 제품의
            움직임을 최소화(파손방지) 합니다.
          </p>
          <p className={classes.etc_desc}>&#183; 프리미엄 시계 전용 패키지에 한 번 더 포장됩니다</p>
          <p className={classes.etc_desc}>
            &#183; 보안 운송 시스템을 접목한 프리미엄 배송 서비스를 이용하여 고객님께 제품을
            안전하고, 빠르게 발송합니다.
          </p>
          <p className={classes.description}>
            수령한 제품에 대한 자세한 문의가 필요할 경우, 고객센터(02-1234-1234) 또는 서비스 내 1:1
            문의를 통해 연락해주시기 바랍니다.
          </p>
          <p></p>
        </div>
      </div>
    </>
  );
};
