const fs      = require('fs'        )
const xml2js  = require('xml2js'    ) 
const http    = require("http"      )
const request = require("request"   )
const util    = require('util'      )
const mysql   = require('mysql'     )
const iconv   = require('iconv-lite')

const parser  = new xml2js.Parser()

if(process.argv.length != 3){
    console.log("상품 코드 넣어주세요.")
    return
}

// YYYYMMDD형태의 오늘 리턴 - 콤포넌트화 필요
function get_YYYYMMDD(date){
    return [         date.getFullYear()
           , ('0' + (date.getMonth   () + 1)).slice(-2)
           , ('0' +  date.getDate    ()     ).slice(-2)
           ].join('')
}

// 금일 추출
const today  = "20200811" //get_YYYYMMDD(new Date())     

// 
const connection = mysql.createConnection({
      host     : 'onnuri0803devdb.c8asboufv859.ap-northeast-2.rds.amazonaws.com'
    , user     : 'nuri0803'
    , password : 'dhssnfl0803!'
    , database : 'onnuridb'
});

connection.connect(function(err) {
    if (err) 
        throw err;
    let query = util.format(`
                SELECT  c.*
                      , d.free_deliv_or_not
                      , d.free_deliv_base_amt
                      , d.deliv_amt
                FROM 
                    (
                    SELECT  a.orig_price
                          , a.pur_price
                          , a.suppl_code
                          , b.*
                    FROM    goods    a
                          , deal     b
                    WHERE   b.deal_id  = %s
                    AND     a.goods_id = b.deal_id
                    ) c, supplier d
                WHERE c.suppl_code = d.suppl_id    
    `, process.argv[2])
    
    connection.query(query, function (err, result, fields) {
        if (err) 
            throw err
        
        var row = result[0]

        // make a data section
        var goods = { 
                // 필수값 설정  
                  GOODS_NM             : row.deal_name        // 상품명(필수)
                , BRAND_NM             : '브랜드 테스트'       // 브랜드명
                , GOODS_REMARKS        : '<!--20200804일괄삽입--><p align="center"><img src="https://www.onnuristore.co.kr/rb/modules/shop/files/2020/08/04/09d15c43d1bb7f4c5b6885b5dba48a24154903.jpg" alt=""><br></p><!--20200804일괄삽입--><p align="center"><img width="640" align="top" class="txc-image photo" alt="" src="http://www.onnurimall.co.kr/rb/modules/shop/files/2015/09/17/a6658a161e9ab2eb95ce212ce829fad1092109.jpg"><br></p><strong><p align="center"><br></p><p align="center"><br></p><div align="left"></div><p></p><p><br></p></strong><p><strong>'
                , COMPAYNY_GOODS_CD    : "999999"             // 자체상품코드(필수)
                , DELV_TYPE            : "1"                  // 배송비구분(필수)  1.무료, 2.착불, 3.선결제, 4.착불/선결제
                , DELV_COST            : "0"                  // 배송비    
                , GOODS_COST           : row.pur_price        // 원가(필수)
                , GOODS_PRICE          : row.orig_price       // 판매가(필수)
                , GOODS_CONSUMER_PRICE : row.sel_price        // TAG가(소비자가)(필수)
                , IMG_PATH             : row.repr_img         // 대표이미지(필수)
  
                // 온누리스토어 상태 변경에 따라 맞게 설정하여 보내야 함
                // 1.대기중, 2.공급중, 3.일시중지, 4.완전품절, 5.미사용, 6.삭제   
                , STATUS               : '1'           // 상품상태

                // 카테고리 - 카테고리 정리 후 되어야함. 지금은 임의로 하드코딩 한다
                , CLASS_CD1            : 'A01'         // 대분류코드(필수)
                , CLASS_CD2            : 'A0101'       // 중분류코드(필수)
                , CLASS_CD3            : 'A010101'     // 소분류코드(필수)

                // 하드코딩값 - ASIS 그대로 따라함, 현업에서는 데이터에 맞게 넣어야 한다고 하는 니즈가 있음
                , ORIGIN               : '기타'        // 원산지(제조국)(필수)
                , GOODS_GUBUN          : '3'           // 상품구분(필수)
                , GOODS_SEASON         : '7'           // 시즌(필수)
                , SEX                  : '4'           // 남녀구분(필수)
                , TAX_YN               : '1'           // 세금구분(필수)
                , STOCK_USE_YN         : 'Y'           // 재고관리사용여부    
                , PROP_EDIT_YN         : 'Y'           // 속성수정여부    
                , DELIV_ABLE_REGION    : '1'           // 판매지역    
                , BANPUM_AREA          : '1'           // 반품지구분    
        }

        // make a header
        var sabangnet_header = { 
              SEND_COMPAYNY_ID : 'onnuri5662'
            , SEND_AUTH_KEY    : 'WXCbKB62TG5TW3xy8rKrA2TB6ERbNx9uM7E'
            , SEND_DATA        : today
            , SEND_GOODS_CD_RT : ''
            , RESULT_TYPE      : 'XML'
        }

        // dump to file
        var builder = new xml2js.Builder({xmldec:{'version': '1.0', 'encoding': 'euc-kr'}, cdata:true})
        var xml     = builder.buildObject({SABANG_GOODS_REGI: {HEADER: sabangnet_header, DATA: goods}})

        const euckr = iconv.encode(xml, 'euc-kr');
    
        fs.writeFileSync("a.xml", euckr.toString('binary'), {encoding: 'binary'})

        connection.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
        });
        
    })
})

    


            












    // , IMG_PATH1            : row.        // 종합몰(JPG)이미지(필수-왜 필수인지 모르겠음)
    // , IMG_PATH3            : row.        // 부가이미지3(필수-왜 필수인지 모르겠음)
    // , GOODS_KEYWORD        :       // 상품약어
    // , MODEL_NM             :       // 모델명
    // , MODEL_NO             :       // 모델No
    // , GOODS_SEARCH         :       // 사이트검색어
    // , CLASS_CD4            :       // 세분류코드    
    // , PARTNER_ID           :       // 매입처ID    
    // , DPARTNER_ID          :       // 물류처ID    
    // , MAKER                :       // 제조사    
    // , MAKE_YEAR            :       // 생산연도    
    // , MAKE_DM              :       // 제조일자    
    // , CHAR_1_NM            :       // 옵션제목(1)    
    // , CHAR_1_VAL           :       // 옵션상세명칭(1)    
    // , CHAR_2_NM            :       // 옵션제목(2)    
    // , CHAR_2_VAL           :       // 옵션상세명칭(2)    
    // , IMG_PATH2            :       // 부가이미지2    
    // , IMG_PATH4            :       // 부가이미지4    
    // , IMG_PATH5            :       // 부가이미지5    
    // , IMG_PATH6            :       // 부가이미지6    
    // , IMG_PATH7            :       // 부가이미지7    
    // , IMG_PATH8            :       // 부가이미지8    
    // , IMG_PATH9            :       // 부가이미지9    
    // , IMG_PATH10           :       // 부가이미지10    
    // , IMG_PATH11           :       // 부가이미지11    
    // , IMG_PATH12           :       // 부가이미지12    
    // , IMG_PATH13           :       // 부가이미지13    
    // , IMG_PATH14           :       // 부가이미지14    
    // , IMG_PATH15           :       // 부가이미지15    
    // , IMG_PATH16           :       // 부가이미지16    
    // , IMG_PATH17           :       // 부가이미지17    
    // , IMG_PATH18           :       // 부가이미지18    
    // , IMG_PATH19           :       // 부가이미지19    
    // , IMG_PATH20           :       // 부가이미지20    
    // , IMG_PATH21           :       // 부가이미지21    
    // , IMG_PATH22           :       // 부가이미지22    
    // , IMG_PATH23           :       // 인증서이미지    
    // , IMG_PATH24           :       // 수입면장이미지    
    // , CERTNO               :       // 인증번호    
    // , AVLST_DM             :       // 인증유효 시작일    
    // , AVLED_DM             :       // 인증유효 마지막일    
    // , ISSUEDATE            :       // 발급일자    
    // , CERTDATE             :       // 인증일자    
    // , CERT_AGENCY          :       // 인증기관    
    // , CERTFIELD            :       // 인증분야    
    // , MATERIAL             :       // 식품재료/원산지    
    // , OPT_TYPE             :       // 옵션수정여부    2
    // , PROP1_CD             :       // 속성분류코드    
    // , PROP_VAL1            :       // 속성값1    
    // , PROP_VAL2            :       // 속성값2    
    // , PROP_VAL3            :       // 속성값3    
    // , PROP_VAL4            :       // 속성값4    
    // , PROP_VAL5            :       // 속성값5    
    // , PROP_VAL6            :       // 속성값6    
    // , PROP_VAL7            :       // 속성값7    
    // , PROP_VAL8            :       // 속성값8    
    // , PROP_VAL9            :       // 속성값9    
    // , PROP_VAL10           :       // 속성값10    
    // , PROP_VAL11           :       // 속성값11    
    // , PROP_VAL12           :       // 속성값12    
    // , PROP_VAL13           :       // 속성값13    
    // , PROP_VAL14           :       // 속성값14    
    // , PROP_VAL15           :       // 속성값15    
    // , PROP_VAL16           :       // 속성값16    
    // , PROP_VAL17           :       // 속성값17    
    // , PROP_VAL18           :       // 속성값18    
    // , PROP_VAL19           :       // 속성값19    
    // , PROP_VAL20           :       // 속성값20    
    // , PROP_VAL21           :       // 속성값21    
    // , PROP_VAL22           :       // 속성값22    
    // , PROP_VAL23           :       // 속성값23    
    // , PROP_VAL24           :       // 속성값24    
    // , PROP_VAL25           :       // 속성값25    
    // , PROP_VAL26           :       // 속성값26    
    // , PROP_VAL27           :       // 속성값27    
    // , PROP_VAL28           :       // 속성값28    
    // , PACK_CODE_STR        :       // 추가상품그룹코드    
    // , GOODS_NM_EN          :       // 영문 상품명    
    // , GOODS_NM_PR          :       // 출력 상품명    
    // , GOODS_REMARKS2       :       // 추가 상품상세설명_1    
    // , GOODS_REMARKS3       :       // 추가 상품상세설명_2    
    // , GOODS_REMARKS4       :       // 추가 상품상세설명_3    
    // , IMPORTNO             :       // 수입신고번호    
    // , GOODS_COST2          :       // 원가2    
    // , ORIGIN2              :       // 원산지 상세지역    
    // , EXPIRE_DM            :       // 유효일자    
    // , SUPPLY_SAVE_YN       :       // 합포제외여부    
    // , DESCRITION           :       // 관리자메모    






