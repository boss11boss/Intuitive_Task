import React from "react";
import { Eye, Plus, Trash } from "react-feather";
import {
  Button,
  CardTitle,
  Row,
  Col,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";

export const AddTaxPerItem = (props) => {
  const { POExcises } = props;
  return (
    <React.Fragment>
      {POExcises?.length > 0 &&
        POExcises.map((data, i) => (
          <FormGroup className="mt-1 pl-2 pr-2" key={"POPOExcises" + i}>
            <Row>
              <Col>
                <Label></Label>
              </Col>
              <Col>
                <Label>Taxes/Duties</Label>
              </Col>
              <Col>
                <Label>Value</Label>
              </Col>
              <Col>
                <Label>Value Type</Label>
              </Col>
              <Col>
                <Label>Amount</Label>
              </Col>
              <Col>
                <Label>Currency</Label>
              </Col>
              <Col>
                <Label>Amount</Label>
              </Col>
              <Col>
                <Label>Remarks</Label>
              </Col>
            </Row>
            <Row>
              <Col className=" text-center">
                <Button
                  size="sm"
                  color="primary"
                  className="cursor-pointer action-btn mr-1"
                  onClick={() => this.handleTaxOperation()}
                  disabled={
                    !this.state.TaxID ||
                    !this.state.UnitIDNumber ||
                    !this.state.Rate ||
                    !this.state.Rec_Quantity
                  }
                >
                  Add Tax/Duty
                </Button>
              </Col>

              <Col>
                <CustomInput
                  bsSize="sm"
                  type="select"
                  id={"TaxIDSelect" + i}
                  name={"TaxIDSelect" + i}
                  value={data?.TaxID ? data?.TaxID : 0}
                  className={"p-0 pl-1"}
                  onChange={(e) => {
                    // this.onTaxInputChange(
                    //   e.target.value,
                    //   "Remarks",
                    //   data?.IDNumber
                    // );
                    this.setState({
                      TaxID: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="0">Select Tax</option>
                  {this.state.taxList &&
                    this.state.taxList?.length > 0 &&
                    this.state.taxList.map((d, i) => (
                      <option value={d.IDNumber} key={d.IDNumber}>
                        {d.Name}
                      </option>
                    ))}
                </CustomInput>
              </Col>

              <Col>
                <Input
                  bsSize="sm"
                  type="number"
                  value={data?.value ? data?.value : ""}
                  onChange={(e) => this.onChange(e, "value")}
                  name={"value" + i}
                  placeholder="value"
                />
              </Col>

              <Col>
                <Input
                  bsSize="sm"
                  type="number"
                  value={data?.valueType ? data?.valueType : ""}
                  onChange={(e) => this.onChange(e, "valueType")}
                  name={"valueType" + i}
                  placeholder="valueType"
                />
              </Col>

              <Col>
                <Input
                  bsSize="sm"
                  type="number"
                  value={data?.Amount ? data?.Amount : ""}
                  onChange={(e) => this.onChange(e, "Amount")}
                  name={"Amount" + i}
                  placeholder="Amount"
                />
              </Col>

              <Col>
                <Input
                  bsSize="sm"
                  type="number"
                  value={data?.currency ? data?.currency : ""}
                  onChange={(e) => this.onChange(e, "currency")}
                  name={"currency" + i}
                  placeholder="currency"
                />
              </Col>

              <Col>
                <Input
                  bsSize="sm"
                  type="number"
                  value={data?.Amount ? data?.Amount : ""}
                  onChange={(e) => this.onChange(e, "Amount")}
                  name={"Amount" + i}
                  placeholder="Amount"
                />
              </Col>
              <Col>
                <Input
                  bsSize="sm"
                  type="text"
                  value={data?.Remarks ? data?.Remarks : ""}
                  onChange={(e) =>
                    this.onInputChange(
                      e.target.value,
                      "Remarks",
                      data?.IDNumber
                    )
                  }
                  name="Remarks"
                  placeholder="Remarks"
                />
              </Col>
            </Row>
          </FormGroup>
        ))}
    </React.Fragment>
    // <Modal
    //   isOpen={props.TaxModal}
    //   toggle={props.toggle}
    //   backdropTransition={{ timeout: 200 }}
    //   size="lg"
    // >
    //   <ModalHeader toggle={props.toggle}>
    //     <CardTitle>Taxes For {props.data.ItemName}</CardTitle>
    //   </ModalHeader>
    //   <ModalBody>
    //     <FormGroup row id="itemdetail">
    //       <Col sm="12" className="text-center">
    //         {props.btnFlg && !props.data?.ItemDetails.length && (
    //           <ErrorText text="There must be at least one item detail" />
    //         )}
    //       </Col>

    //       {props.data.ItemDetails?.length > 0 &&
    //         props.data.ItemDetails?.map((data, i) => {
    //           return (
    //             <div className="d-flex w-100" key={"POItemDetails" + i}>
    //               <Col className="mt-2 text-center">
    //                 <Button
    //                   color="primary"
    //                   className="cursor-pointer action-btn mr-1"
    //                   size="sm"
    //                   onClick={() => this.toggleModal(data)}
    //                 >
    //                   <Eye size={16} />
    //                 </Button>
    //                 <Button
    //                   color="danger"
    //                   className="cursor-pointer action-btn"
    //                   size="sm"
    //                   onClick={() => {
    //                     let objectIndex = props.data.SupplierItemDetails.findIndex(
    //                       (d) => d.IDNumber === data.IDNumber
    //                     );
    //                     props.data.SupplierItemDetails.splice(objectIndex, 1);
    //                     this.setState({
    //                       DeletedItemDetails:
    //                         props.data.DeletedItemDetails + "," + data.IDNumber,
    //                     });
    //                   }}
    //                 >
    //                   <Trash size={16} />
    //                 </Button>
    //               </Col>

    //               <Col>
    //                 <Label>Tax</Label>
    //                 <CustomInput
    //                   bsSize="sm"
    //                   type="select"
    //                   id={"TaxIDSelect" + i}
    //                   name={"TaxIDSelect" + i}
    //                   value={data?.TaxID ? data?.TaxID : 0}
    //                   className={"p-0 pl-1"}
    //                   onChange={(e) => {
    //                     this.setState({
    //                       TaxID: parseInt(e.target.value),
    //                     });
    //                   }}
    //                   disabled
    //                 >
    //                   <option value="0">Select Tax</option>
    //                   {props.data.taxList &&
    //                     props.data.taxList?.length > 0 &&
    //                     props.data.taxList.map((d, i) => (
    //                       <option value={d.IDNumber} key={d.IDNumber}>
    //                         {d.Name}
    //                       </option>
    //                     ))}
    //                 </CustomInput>
    //               </Col>

    //               <Col>
    //                 <Label>Quantity</Label>
    //                 <Input
    //                   bsSize="sm"
    //                   type="number"
    //                   value={data?.Qty ? data?.Qty : ""}
    //                   onChange={(e) => this.onChange(e, "Qty")}
    //                   name={"quantity" + i}
    //                   placeholder="Quantity"
    //                   disabled
    //                 />
    //               </Col>

    //               <Col>
    //                 <Label>Rate</Label>
    //                 <Input
    //                   bsSize="sm"
    //                   type="number"
    //                   value={data?.Rate ? data?.Rate : ""}
    //                   onChange={(e) => this.onChange(e, "Rate")}
    //                   name={"Rate" + i}
    //                   placeholder="Rate"
    //                   disabled
    //                 />
    //               </Col>

    //               <Col>
    //                 <Label>Unit</Label>
    //                 <CustomInput
    //                   bsSize="sm"
    //                   type="select"
    //                   id={"UnitIDSelect" + i}
    //                   name={"UnitIDSelect" + i}
    //                   value={data?.UnitID ? data?.UnitID : ""}
    //                   className={`p-0 pl-1`}
    //                   onChange={(e) => {
    //                     this.setState({
    //                       UnitID: parseInt(e.target.value),
    //                     });
    //                   }}
    //                 >
    //                   <option value="0">Select Unit</option>
    //                   {props.data.unitList &&
    //                     props.data.unitList?.length > 0 &&
    //                     props.data.unitList.map((d, i) => (
    //                       <option value={d.value} key={d.value}>
    //                         {d.label}
    //                       </option>
    //                     ))}
    //                 </CustomInput>
    //               </Col>

    //               <Col>
    //                 <Label>Rec_Quantity</Label>
    //                 <Input
    //                   bsSize="sm"
    //                   type="number"
    //                   value={data?.Rec_Quantity ? data?.Rec_Quantity : ""}
    //                   onChange={(e) => this.onChange(e, "Rec_Quantity")}
    //                   name={"Rec_Quantity" + i}
    //                   placeholder="Rec_Quantity"
    //                 />
    //               </Col>

    //               <Col>
    //                 <Label>InwardQty</Label>
    //                 <Input
    //                   bsSize="sm"
    //                   type="number"
    //                   value={data?.InwardQty ? data?.InwardQty : ""}
    //                   onChange={(e) => this.onChange(e, "InwardQty")}
    //                   name={"InwardQty" + i}
    //                   placeholder="InwardQty"
    //                 />
    //               </Col>

    //               <Col>
    //                 <Label>Remark</Label>
    //                 <Input
    //                   bsSize="sm"
    //                   type="text"
    //                   value={data?.Remark ? data?.Remark : ""}
    //                   onChange={(e) => this.onChange(e, "Remark")}
    //                   name={"Remark" + i}
    //                   placeholder="Remark"
    //                 />
    //               </Col>
    //             </div>
    //           );
    //         })}

    //       <div className="d-flex w-100">
    //         <Col className="mt-2 text-center">
    //           <Button
    //             size="sm"
    //             color="primary"
    //             className="cursor-pointer action-btn"
    //             onClick={() => {
    //               const exist = props.data.ItemDetails?.filter((data) => {
    //                 return data.IDNumber === props.data.id;
    //               })?.[0];

    //               if (exist) {
    //                 let objectIndex = props.data.ItemDetails.findIndex(
    //                   (d) => d.IDNumber === props.data.id
    //                 );
    //                 let tmpItemDetails = [...props.data.ItemDetails];
    //                 tmpItemDetails[objectIndex] = {
    //                   ...tmpItemDetails[objectIndex],
    //                   ItemID: props.data.ItemID,
    //                   Qty: props.data.Qty,
    //                   Rate: props.data.Rate,
    //                   UnitID: props.data.UnitID,
    //                   Rec_Quantity: props.data.Rec_Quantity,
    //                   InwardQty: props.data.InwardQty,
    //                   BaseRate: props.data.BaseRate,
    //                   ConversionRate: props.data.ConversionRate,
    //                   BaseAmount: props.data.BaseAmount,
    //                   TotalIndentQty: props.data.TotalIndentQty,
    //                   QtyPerUnit: props.data.QtyPerUnit,
    //                   RatePerUnit: props.data.RatePerUnit,
    //                   BaseQty: props.data.BaseQty,
    //                   DISCPERC: props.data.DISCPERC,
    //                   DISCAMT: props.data.DISCAMT,
    //                   Remark: props.data.Remark,
    //                 };
    //                 this.setState({
    //                   ItemDetails: tmpItemDetails,
    //                 });
    //               } else {
    //                 if (props.data.ItemDetails.length > 0) {
    //                   this.setState({
    //                     ItemDetails: [
    //                       ...props.data.ItemDetails,
    //                       {
    //                         IDNumber: 0,
    //                         ItemID: props.data.ItemID,
    //                         Qty: props.data.Qty,
    //                         Rate: props.data.Rate,
    //                         UnitID: props.data.UnitID,
    //                         Rec_Quantity: props.data.Rec_Quantity,
    //                         InwardQty: props.data.InwardQty,
    //                         BaseRate: props.data.BaseRate,
    //                         ConversionRate: props.data.ConversionRate,
    //                         BaseAmount: props.data.BaseAmount,
    //                         TotalIndentQty: props.data.TotalIndentQty,
    //                         QtyPerUnit: props.data.QtyPerUnit,
    //                         RatePerUnit: props.data.RatePerUnit,
    //                         BaseQty: props.data.BaseQty,
    //                         DISCPERC: props.data.DISCPERC,
    //                         DISCAMT: props.data.DISCAMT,
    //                         Remark: props.data.Remark,
    //                       },
    //                     ],
    //                   });
    //                 } else {
    //                   this.setState({
    //                     ItemDetails: [
    //                       {
    //                         IDNumber: 0,
    //                         ItemID: props.data.ItemID,
    //                         Qty: props.data.Qty,
    //                         Rate: props.data.Rate,
    //                         UnitID: props.data.UnitID,
    //                         Rec_Quantity: props.data.Rec_Quantity,
    //                         InwardQty: props.data.InwardQty,
    //                         BaseRate: props.data.BaseRate,
    //                         ConversionRate: props.data.ConversionRate,
    //                         BaseAmount: props.data.BaseAmount,
    //                         TotalIndentQty: props.data.TotalIndentQty,
    //                         QtyPerUnit: props.data.QtyPerUnit,
    //                         RatePerUnit: props.data.RatePerUnit,
    //                         BaseQty: props.data.BaseQty,
    //                         DISCPERC: props.data.DISCPERC,
    //                         DISCAMT: props.data.DISCAMT,
    //                         Remark: props.data.Remark,
    //                       },
    //                     ],
    //                   });
    //                 }
    //               }
    //               this.toggleModal();
    //               this.setState({
    //                 ItemID: 0,
    //                 UnitID: 0,
    //                 Qty: "",
    //                 Rate: "",
    //                 Rec_Quantity: "",
    //                 InwardQty: "",
    //                 BaseRate: "",
    //                 ConversionRate: "",
    //                 BaseAmount: "",
    //                 TotalIndentQty: "",
    //                 QtyPerUnit: "",
    //                 RatePerUnit: "",
    //                 BaseQty: "",
    //                 DISCPERC: "",
    //                 DISCAMT: "",
    //                 Remark: "",
    //                 id: null,
    //               });
    //             }}
    //             disabled={
    //               !props.data.ItemID ||
    //               !props.data.Qty ||
    //               !props.data.UnitID ||
    //               !props.data.Rate ||
    //               !props.data.Rec_Quantity ||
    //               !props.data.InwardQty ||
    //               !props.data.BaseRate ||
    //               !props.data.ConversionRate ||
    //               !props.data.BaseAmount ||
    //               !props.data.TotalIndentQty ||
    //               !props.data.QtyPerUnit ||
    //               !props.data.RatePerUnit ||
    //               !props.data.BaseQty ||
    //               !props.data.DISCPERC ||
    //               !props.data.DISCAMT
    //             }
    //           >
    //             <Plus size={14} />
    //           </Button>
    //         </Col>

    //         <Col>
    //           <Label>Tax</Label>
    //           <CustomInput
    //             bsSize="sm"
    //             type="select"
    //             id={"TaxIDSelect"}
    //             name={"TaxIDSelect"}
    //             value={props.data?.TaxID ? props.data?.TaxID : 0}
    //             className={"p-0 pl-1"}
    //             onChange={(e) => {
    //               this.setState({
    //                 TaxID: parseInt(e.target.value),
    //               });
    //             }}
    //           >
    //             <option value="0">Select Tax</option>
    //             {props.data.taxList &&
    //               props.data.taxList?.length > 0 &&
    //               props.data.taxList.map((d, i) => (
    //                 <option value={d.IDNumber} key={d.IDNumber}>
    //                   {d.Name}
    //                 </option>
    //               ))}
    //           </CustomInput>
    //         </Col>

    //         <Col>
    //           <Label>Value</Label>
    //           <CustomInput
    //             bsSize="sm"
    //             type="select"
    //             id={"TaxIDSelect"}
    //             name={"TaxIDSelect"}
    //             value={props.data?.TaxID ? props.data?.TaxID : 0}
    //             className={"p-0 pl-1"}
    //             onChange={(e) => {
    //               this.setState({
    //                 TaxID: parseInt(e.target.value),
    //               });
    //             }}
    //             disabled
    //           >
    //             <option value="0">Select Tax</option>
    //             {props.data.taxList &&
    //               props.data.taxList?.length > 0 &&
    //               props.data.taxList.map((d, i) => (
    //                 <option value={d.IDNumber} key={d.IDNumber}>
    //                   {d.Name}
    //                 </option>
    //               ))}
    //           </CustomInput>
    //         </Col>

    //         <Col>
    //           <Label>Tax</Label>
    //           <CustomInput
    //             bsSize="sm"
    //             type="select"
    //             id={"TaxIDSelect"}
    //             name={"TaxIDSelect"}
    //             value={props.data?.TaxID ? props.data?.TaxID : 0}
    //             className={"p-0 pl-1"}
    //             onChange={(e) => {
    //               this.setState({
    //                 TaxID: parseInt(e.target.value),
    //               });
    //             }}
    //           >
    //             <option value="0">Select Tax</option>
    //             {props.data.taxList &&
    //               props.data.taxList?.length > 0 &&
    //               props.data.taxList.map((d, i) => (
    //                 <option value={d.IDNumber} key={d.IDNumber}>
    //                   {d.Name}
    //                 </option>
    //               ))}
    //           </CustomInput>
    //         </Col>
    //         <Col>
    //           <Label>Tax</Label>
    //           <CustomInput
    //             bsSize="sm"
    //             type="select"
    //             id={"TaxIDSelect"}
    //             name={"TaxIDSelect"}
    //             value={props.data?.TaxID ? props.data?.TaxID : 0}
    //             className={"p-0 pl-1"}
    //             onChange={(e) => {
    //               this.setState({
    //                 TaxID: parseInt(e.target.value),
    //               });
    //             }}
    //           >
    //             <option value="0">Select Tax</option>
    //             {props.data.taxList &&
    //               props.data.taxList?.length > 0 &&
    //               props.data.taxList.map((d, i) => (
    //                 <option value={d.IDNumber} key={d.IDNumber}>
    //                   {d.Name}
    //                 </option>
    //               ))}
    //           </CustomInput>
    //         </Col>
    //         <Col>
    //           <Label>Tax</Label>
    //           <CustomInput
    //             bsSize="sm"
    //             type="select"
    //             id={"TaxIDSelect"}
    //             name={"TaxIDSelect"}
    //             value={props.data?.TaxID ? props.data?.TaxID : 0}
    //             className={"p-0 pl-1"}
    //             onChange={(e) => {
    //               this.setState({
    //                 TaxID: parseInt(e.target.value),
    //               });
    //             }}
    //           >
    //             <option value="0">Select Tax</option>
    //             {props.data.taxList &&
    //               props.data.taxList?.length > 0 &&
    //               props.data.taxList.map((d, i) => (
    //                 <option value={d.IDNumber} key={d.IDNumber}>
    //                   {d.Name}
    //                 </option>
    //               ))}
    //           </CustomInput>
    //         </Col>
    //         <Col>
    //           <Label>Tax</Label>
    //           <CustomInput
    //             bsSize="sm"
    //             type="select"
    //             id={"TaxIDSelect"}
    //             name={"TaxIDSelect"}
    //             value={props.data?.TaxID ? props.data?.TaxID : 0}
    //             className={"p-0 pl-1"}
    //             onChange={(e) => {
    //               this.setState({
    //                 TaxID: parseInt(e.target.value),
    //               });
    //             }}
    //           >
    //             <option value="0">Select Tax</option>
    //             {props.data.taxList &&
    //               props.data.taxList?.length > 0 &&
    //               props.data.taxList.map((d, i) => (
    //                 <option value={d.IDNumber} key={d.IDNumber}>
    //                   {d.Name}
    //                 </option>
    //               ))}
    //           </CustomInput>
    //         </Col>

    //         <Col>
    //           <Label>Remark</Label>
    //           <Input
    //             bsSize="sm"
    //             type="text"
    //             value={props.data.Remark ? props.data.Remark : ""}
    //             onChange={(e) => this.onChange(e, "Remark")}
    //             name="Remark"
    //             placeholder="Remark"
    //           />
    //         </Col>
    //       </div>
    //     </FormGroup>
    //   </ModalBody>
    //   <ModalFooter>
    //     <Button color="primary" onClick={props.toggle}>
    //       Do Something
    //     </Button>{" "}
    //     <Button color="secondary" onClick={props.toggle}>
    //       Cancel
    //     </Button>
    //   </ModalFooter>
    // </Modal>
  );
};
