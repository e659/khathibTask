import React from "react";

export default function ClientDetailsDataTable({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
  client,
}) {
 
  return (
    <div>
      <>
        {!menuCollapse ? (
          <>
            <div
              className="bg-white mt-3 details__warraper"
              style={{ width: "1199px" }}
            >
              <p className="detailstablecaption ps-3">Appeals Data </p>
              <div
                className="bg-white pt-3 mt-3 rounded rounded-3 client__tableheader"
                style={{ width: "1199px" }}
              >
                <table className="table mt-2 p-4">
                  <thead className="py-2">
                    <tr>
                      <th className="" scope="col"></th>
                      <th className="client__th" scope="col">
                        Pins
                      </th>
                      <th className="client__th" scope="col">
                        Address
                      </th>
                      <th className="client__th" scope="col">
                        Status
                      </th>
                      <th className="client__th" scope="col">
                        Notes
                      </th>
                      <th className="client__th" scope="col">
                        Files
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {client?.appeal_data?.map((cl) => {
                      return <tr key={cl.id}></tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Invoices Data table */}
            <div  className="bg-white mt-3 details__warraper"
              style={{ width: "1199px" }}>
              <p className="detailstablecaption ps-3">Invoices Data </p>
              <div
                className="bg-white pt-3 mt-3 rounded rounded-3 client__tableheader"
                style={{ width: "1199px" }}
              >
                <table className="table mt-2 p-4">
                  <thead className="py-2">
                    <tr>
                      <th className="" scope="col"></th>
                      <th className="client__th" scope="col">
                        Actual Saving
                      </th>
                      <th className="client__th" scope="col">
                        Invoice Amount
                      </th>
                      <th className="client__th" scope="col">
                        Payed
                      </th>
                      <th className="client__th" scope="col">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {client?.invoices_data?.map((cl) => {
                      return <tr key={cl.id}></tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="bg-white mt-3 details__warraper"
              style={{ width: "1350px" }}
            >
              <p className="detailstablecaption ps-3">Appeals Data </p>
              <div
                className="bg-white pt-3 mt-3 rounded rounded-3 client__tableheader"
                style={{ width: "1350px" }}
              >
                <table className="table mt-2 p-4">
                  <thead className="py-2">
                    <tr>
                      <th className="" scope="col"></th>
                      <th className="client__th" scope="col">
                        Pins
                      </th>
                      <th className="client__th" scope="col">
                        Address
                      </th>
                      <th className="client__th" scope="col">
                        Status
                      </th>
                      <th className="client__th" scope="col">
                        Notes
                      </th>
                      <th className="client__th" scope="col">
                        Files
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {client?.appeal_data?.map((cl) => {
                      return <tr key={cl.id}></tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Invoices Data table */}
            <div  className="bg-white mt-3 details__warraper"
              style={{ width: "1350px" }}>
              <p className="detailstablecaption ps-3">Invoices Data </p>
              <div
                className="bg-white pt-3 mt-3 rounded rounded-3 client__tableheader"
                style={{ width: "1350px" }}
              >
                <table className="table mt-2 p-4">
                  <thead className="py-2">
                    <tr>
                      <th className="" scope="col"></th>
                      <th className="client__th" scope="col">
                        Actual Saving
                      </th>
                      <th className="client__th" scope="col">
                        Invoice Amount
                      </th>
                      <th className="client__th" scope="col">
                        Payed
                      </th>
                      <th className="client__th" scope="col">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {client?.invoices_data?.map((cl) => {
                      return <tr key={cl.id}></tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
