import * as react from 'react';
import * as react from 'react-dom';
import GC from '@mescius/spread-sheets';
import "@mescuis/spread-sheets-tablesheet";
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react';
import './styles/admin.module.css'

const Component = React.Component;

function getElementById(id) {
  return document.getElementById(id);
}

export class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="sample-tutorial">
        <div class="sample-spreadsheets">
          <SpreadSheets
            workbookInitialized={(spread) => this.initSpread(spread)}
          ></SpreadSheets>
        </div>
      </div>
    );
  }
  initSpread(spread) {
    spread.suspendPaint();
    spread.clearSheets();
    spread.options.autoFitType = GC.Spread.Sheets.AutoFitType.cellWithHeader;

    //init a data manager
    var tableName = "Supplier";
    var baseApiUrl = getBaseApiUrl();
    var apiUrl = baseApiUrl + "/" + tableName;
    var dataManager = spread.dataManager();
    var myTable = dataManager.addTable("myTable", {
      remote: {
        read: {
          url: apiUrl,
        },
      },
    });

    //init a table sheet
    var sheet = spread.addSheetTab(
      0,
      "TableSheet1",
      GC.Spread.Sheets.SheetType.tableSheet
    );
    sheet.options.allowAddNew = false; //hide new row

    //bind a view to the table sheet
    myTable.fetch().then(function () {
      var style = { formatter: "MM/dd/yyyy" };
      var view = myTable.addView("myView", [
        { value: "Id", width: 80 },
        { value: "EmployeeName", width: 200, caption: "Employee Name" },
        { value: "role", width: 150, caption: "role" },
        { value: "ContactEmail", width: 150, caption: "ContactEmail" },
        { value: "Contact#", width: 200, caption: "Contact#" },
        { value: "Address", width: 200 },
        { value: "City", width: 150, caption: "City" },
        { value: "State", width: 100, caption: "State" },
        { value: "Region", width: 100, caption: "Region" },
      ]);
      sheet.setDataView(view);
    });

    spread.resumePaint();
  }
}

function getBaseApiUrl() {
  return (
    window.location.href.match(/http.+spreadjs\/demos\//)[0] + "server/api"
  );
}