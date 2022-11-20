import _ from 'lodash';

// Гипотеза решения
// 1. Использовать внутреннюю функцию обходчика с помещением 
// результатов обхода в аккумулятор (объект). В который слить данные из обоих
// файлов с дополненительными метками для каждого ключа о том, в каком файле находится ключ словаря
// и является ли он объектом. В него также перенести значения из обоих файлов.

// Сравниваются значения "на одном уровне" объектов

// 2. Предполагается, что после построения такого аккумуляторва можно сделать его обход, 
// определить различия в содержании на основе проставленных на шаге 1 меток и отформатировать 
// в нужном виде

// 3. Обход содержания файла рекурсивен

// 4. Сигнатура функции обхода:
//    - название узла (ключа)
//    - старого объекта, обновляется когда происхоидит проваливание на следующий уровень вниз
//    - нового объекта, так же обновляется
//    - накопитель данных, в него дописываются данные (новые метки и значения из обоих файлов)


// 5. Нужно реализовать обходчик такой структуры также рекурсивно 

// 6. Затруднения
// - подключение результата обхода одного уровня в общий накопитель
// - настройка проваливания на следующий уровень и возврат обратно 



// const createDiff = (objOld, objNew) => {
//   const accumulator = {};

//   const crawler = (nodeOld, nodeNew, accum) => {


//     const entriesNew = Object.entries(nodeNew);
//     const entriesOld = Object.entries(nodeOld);
    
//     for (const [key, value] of entriesNew) {
//       accum[key] = {
//         'newObject': {
//           'isExist': true,
//           'isObject': typeof value === 'object', 
//           'val': _.get(nodeNew, key)
//         },
//         'oldObject': {
//           'isExist': false,
//           'isObject': false,
//           'val': false
//         }
//       }
//       if (Object.hasOwn(nodeOld, key)) {
//         accum[key]['oldObject']['isExist'] = true;
//           if (typeof _.get(nodeOld, key) === 'object' ) {
//             accum[key]['oldObject']['isObject'] = true;
//           }
//           accum[key]['oldObject']['val'] = _.get(nodeOld, key);
//       }
//     }
//     for (const [key, value] of entriesOld) { 
//       if (!Object.hasOwn(nodeNew, key)) {

//         accum[key] = {
//           'newObject': {
//             'isExist': false,
//             'isObject': false, 
//             'val': false,
//           },
//           'oldObject': {
//             'isExist': true,
//             'isObject': typeof value === 'object',
//             'val': _.get(nodeOld, key),
//           }
//         }
//       }
//     }

//     return accum;

//     // передать результат в аккумулятор ?
//     // const newAccum; 

//     // получить следующие узлы на 1 уровень ниже ? 
//     // const childrenNew = Object.keys(nodeNew);
    

//     // вызвать рекурсивно для каждого из узла обходчик ? 
//     // return childrenNew.map((child) => crawler());
    
//   }
//   return crawler(objOld, objNew, accumulator);
//   };

//------------------------------------------------------------

const writeInfo = (item, parentOld, parentNew) => {
      const meta = {
        'objectOld': {
          'isExist': false,
          'isObject': false, 
          'val': false
        },
        'objectNew': {
          'isExist': true,
          'isObject': typeof _.get(parentNew, item) === 'object',
          'val': _.get(parentNew, item)
        }
      }

      if (Object.hasOwn(parentOld, item)) {
        _.set(meta, `${item}.objectOld.objectOld`, true);
          if (typeof _.get(parentOld, item) === 'object' ) {
            meta[item]['objectOld']['isObject'] = true;
          }
          meta[item]['objectOld']['val'] = _.get(parentOld, item);
      
      }
      
      return meta;
};

const createDiff = (objectOld, objectNew) => {

  // внешний контекст функции
  // определить переменные на основе контекста подаваемых на вход объектов
  const treeOld = Object.keys(objectOld);
  const treeNew = Object.keys(objectNew);
  const accumulator = {};

  // получается пока, что эта внутренняя функция вызывается на коллекции
  const compareObjects = (treeOld, treeNew, parentOld, parentNew, accum) => {

    // получить значение ключа
    const value = parentNew[treeNew]; 

    // временные переменные для последующего обновления, сохраняют контекст
    // т е той области, внутри которой работает функция
    let treeNewCurr = treeNew;
    let treeOldCurr = treeOld;
    let parentNewCurr = parentNew;
    let parentOldCurr = parentOld;

    // записать значение в дифф объект - ToDo create keys
    // accum.parentNewCurr.treeNewCurr.value = value;
    _.set(accum, `${parentNewCurr}.${treeNewCurr}`, value);

    // произвести сравнение со старым словарем в функции writeInfo
    const metaData = writeInfo(treeNewCurr, parentOldCurr, parentNewCurr);

    // записать метаинформацию в дифф объект
    // accum.parentNewCurr.treeNewCurr.meta = metaData;
    _.set(accum, `${parentNewCurr}.${treeNewCurr}`, metaData);

    // терминальный случай, когда спускаться по дереву некуда
    if (typeof value !== 'object') {

      // вернуть управление
      return;
    }

    // получить список нижних узлов
    treeNewCurr = Object.keys(treeNewCurr);
    treeOldCurr = Object.keys(treeOldCurr);

    // обновить значения родительских узлов
    parentNewCurr = value;
    parentOldCurr = parentOld[treeOld];

    // переключить на следующего потомка - ? 

    //
    console.log(accum);

    // вывернуть наизнанку и наружу следующий по глубине слой
    // "для каждого потомка от каждого из родителей пройтись" - ?
    return treeNewCurr.map((child) => {
      // ToDo
      compareObjects(treeOldCurr, treeNewCurr, parentOldCurr, parentNewCurr);

    })

  };

  // правильно вызвать, через .map() - ? и несколько коллекций подключить ? 
  // ToDo
  return compareObjects(treeOld, treeNew, objectOld, objectNew, accumulator);
};

export { createDiff };
