import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";

import IOrder from "../../types/IOrder";
import $axios from "@/axios/index";
import { OrderRequestState, IOrderResponse } from "../../types/IOrder";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal/Modal";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllOrderRequests = () => {
  const [allOrderRequests, setAllOrderRequests] = useState<IOrderResponse[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.get("order");
        setAllOrderRequests(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const [filterState, setFilterState] = useState<OrderRequestState | "ALL">(
    "ALL"
  );
  const handleChangeFilterState = (event: SelectChangeEvent) => {
    setFilterState(event.target.value as OrderRequestState);
  };
  const [toMoveState, setToMoveState] = useState<OrderRequestState | "">("");

  const handleChangeStateToMove = (event: SelectChangeEvent) => {
    setToMoveState(event.target.value as OrderRequestState);
  };

  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelectedRequests((reqs) =>
      event.target.checked ? [...reqs, id] : reqs.filter((r) => r != id)
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (toMoveState) handleOpen();
  }, [toMoveState]);

  const handleChangeRequestsState = async () => {
    try {
      const res = await $axios.post("order/updateMany", {
        ids: selectedRequests,
        newState: toMoveState,
      });
      if (res.status == 201 && toMoveState) {
        setAllOrderRequests((reqs) =>
          reqs.map((r) =>
            selectedRequests.includes(r.id) ? { ...r, state: toMoveState } : r
          )
        );
        setSelectedRequests([]);
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <div className="section mt-8">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Check lại 1 lần nào {":))"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Chuyển tất cả đơn hàng đang chọn sang trạng thái {toMoveState} ?
          </Typography>
          <div className="flex flex-row gap-3">
            <Button variant="contained" color="error" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleChangeRequestsState}
            >
              OK!!
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="flex flex-row justify-between">
        <Box sx={{ maxWidth: 240, minWidth: 240 }} className="mb-6">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterState}
              label="filterState"
              onChange={handleChangeFilterState}
            >
              <MenuItem value="ALL">ALL</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="RESOLVED">RESOLVED</MenuItem>
              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ maxWidth: 240, minWidth: 240 }} className="mb-6">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Change State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={toMoveState}
              label="Change State"
              onChange={handleChangeStateToMove}
            >
              <MenuItem value={OrderRequestState.RESOLVED}>RESOLVED</MenuItem>
              <MenuItem value={OrderRequestState.DONE}>DONE</MenuItem>
              <MenuItem value={OrderRequestState.PENDING}>PENDING</MenuItem>
              <MenuItem value={OrderRequestState.CANCELLED}>CANCELLED</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <table className="table-auto text-center w-full">
        <thead className="border-b-2">
          <tr>
            <th>fullName</th>
            <th>phoneNumber</th>
            <th>address</th>
            <th>Items</th>
            <th>paymentMethod</th>
            <th>Created At</th>
            <th>state</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody className="gap-3">
          {allOrderRequests
            .filter((r) => filterState == "ALL" || r.state == filterState)
            .map((request) => (
              <tr key={request.id} className="border-b-2">
                <td className="">{request.fullName}</td>
                <td className="">{request.phoneNumber}</td>
                <td className="">{request.address}</td>
                <td className="">
                  {Object.keys(request.items!).map((key) => (
                    <div key={key}>
                      {request.items![key].details.name} x{" "}
                      {request.items![key].quantity}
                    </div>
                  ))}
                </td>
                <td className="">{request.paymentMethod}</td>
                {request.createdAt && (
                  <td className="">
                    {new Date(Date.parse(request.createdAt)).toLocaleString()}
                  </td>
                )}
                <td className="">{request.state}</td>
                <td>
                  <Checkbox
                    checked={selectedRequests.includes(request.id)}
                    onChange={($event) => handleChange($event, request.id!)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrderRequests;
