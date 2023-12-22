const prisma = require('../prisma/prismaClient')
const deletePolution = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletePolutionbyId = await prisma.polution.deleteMany({
            where: { id: id }
        })
        BigInt.prototype.toJSON = function(){
            const int = Number.parseInt(this.toString());
            return int ?? this.toString();
          }
        res.status(200).json({
            message: "success",
            data: deletePolutionbyId
        })
    } catch (error) {
        console.error("Error deleting pollution:", error);
        res.status(400).json({
            message: "Internal server error",
            error: error.message  // Send the actual error message for debugging
        });
    }
}

module.exports = deletePolution;
