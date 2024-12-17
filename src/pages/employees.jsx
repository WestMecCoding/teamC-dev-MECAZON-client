import * as React from "react";
import * as ReactDOM from "react-dom";
import GC from "@mescius/spread-sheets-tablesheet";
import { spreadSheets, Worksheets } from "@mescius/spread-react";
import "./styles/Admin.module.css";

export function AppFunc() {
  let initSpread = function (spread) {
    spread.suspendPaint();
    spread.clearSheets();
    spread.options.autoFitType = GC.Spread.sheets.AutoFitType.cellWithHeader;

    var tableName = "supplier";
    var baseApiUrl = getBaseApiUrl();
    var apiUrl = `${baseApiUrl}/${tableName}`;
    var dataManager = spread.dataManager();
    var myTable = dataManager.addTable("myTable", {
      remote: {
        read: {
          url: apiUrl,
        },
      },
    });
    var sheet = spread.addSheetTab(
      0,
      "TableSheet1",
      GC.Spread.Sheets.SheetType.TableSheet
    );
    sheet.option.allowAddNew = false;

    myTable.fetch().then(function () {
      var style = { formatter: "MM/dd/yyyy" };
      var view = myTable.addView("myView", [
        { value: "id", width: 80 },
        { value: "EmployeeName", width: 200, caption: "Employee Name" },
        { value: "role", width: 100, caption: "Role" },
        { value: "ContactEmail", width: 150, caption: "Contact Email" },
        { value: "Contact#", width: 200, caption: "Contact #" },
        { value: "Address", width: 200 },
        { value: "City", width: 150, caption: "City" },
        { value: "State", width: 100, caption: "State" },
        { value: "Region", width: 100, caption: "Region" },
      ]);
      sheet.setDataView(view);
    });
    spread.resumePaint();
  };

  return (
    <div className="spreadsheetWrapper">
      <div className="spreadsheet">
        <spreadSheets
          workbookInitialized={(spread) => initSpread(spread)}
        ></spreadSheets>
      </div>
    </div>
  );
}

function getBaseApiUrl() {
  const match = window.location.href.match(/http.+spreadjs\/demos\//);
  return match ? match[0] + "server/api" : "";
}
