const { produce } = require("immer");
const ADD_ITEM ="ADD_ITEM"
const NEW_ITEM = "NEW_ITEM"
const TEMP_NEW_ITEM = "TEMP_NEW_ITEM"
const DEL_ITEM = "DEL_ITEM"
const MODI_ITEM = "MODI_ITEM"

const initialState = {
    // 아이템들이 계속 담겨있을 배열
    items: [

    ],

    //새 아이템 추가 했을때 해당 아이템 값이 임시로 담겨있을 객체
    newTempItem : {},
}

const itemReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {
      switch (action.type) {
          //추가
        case ADD_ITEM:
          // draft.push(action.data);

          //원래는 아래
          //draft.items = action.data.newItem;

          //변경중.
          console.log(action.data.addItem);
          draft.items.push(action.data.addItem);
          break;

        // 초기화
        case NEW_ITEM:
            draft.items = action.data.newItem;
             break;

        case TEMP_NEW_ITEM:
            console.log(action.data.item);
            draft.newTempItem = action.data.item;
            break;
  
        case DEL_ITEM:

            const idx = draft.items.findIndex(function(data) {return data.kind === action.data.item})
            if(idx > -1) draft.items.splice(idx,1);
            break;
            //draft.items.filter((element) => {element.kind !== 1});
            
        case MODI_ITEM:
           // console.log(draft);

            //console.log(action.data);
            //console.log(draft.items);

            const curidx = draft.items.findIndex(function(data) {return data.index === action.data.item.idx})
            draft.items[curidx].x = action.data.item.x;
            draft.items[curidx].y = action.data.item.y;
            //console.log("바꾸기 전");
            //console.log(draft.items);

            //console.log(curidx);
            //con
            
            // if(curidx > -1) draft.items.splice(curidx,1);
            
            break;
            //console.log(draft.items[curidx]);


            //console.log(draft.items[curidx]);
            //draft.items[curidx].x = action.data.item.x;
            //draft.items[curidx].y = action.data.item.y;
            //console.log(curidx);
            
            //console.log("바꾼 후");
            //console.log(draft.items);
        default:
          break;
      }
    });
};

module.exports = itemReducer;