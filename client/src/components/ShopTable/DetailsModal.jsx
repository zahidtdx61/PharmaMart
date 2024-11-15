import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";

const DetailsModal = ({ open, setOpen, medicine }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog color="primary" layout="center">
        <ModalClose />
        <Typography variant="h4" color="primary" className="font-semibold">
          {" "}
          {medicine.name}{" "}
        </Typography>
        <div className="size-56 mx-auto">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div>
          <Typography variant="h6" color="secondary" className="font-semibold">
            Company: {medicine.company}
          </Typography>
          <Typography variant="h6" color="secondary" className="font-semibold">
            Type: {medicine.type}
          </Typography>
          <Typography variant="h6" color="secondary" className="font-semibold">
            Description: {medicine.description}
          </Typography>
          <Typography variant="h6" color="secondary" className="font-semibold">
            Per Unit Price: {medicine.pricePerUnit}{" "}
          </Typography>
          <Typography variant="h6" color="secondary" className="font-semibold">
            Stock: {medicine.status}{" "}
          </Typography>
          <Typography variant="h6" color="secondary" className="font-semibold capitalize">
            Quantity: {medicine.quantity}{" "}
          </Typography>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default DetailsModal;
