"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPaymentsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const moment = require("moment");
class ListPaymentsService {
    execute({ type_payment, table_id, user_id, date_from, date_to }) {
        return __awaiter(this, void 0, void 0, function* () {
            date_to = moment(date_to, "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');
            if (type_payment === undefined) {
                const payments = yield prisma_1.default.payment.findMany({
                    where: {
                        table_id: table_id,
                        user_id: user_id,
                        created_at: {
                            gte: new Date(date_from),
                            lte: new Date(date_to)
                        },
                    },
                    select: {
                        id: true,
                        total_amount: true,
                        amount_paid: true,
                        amount_pix: true,
                        amount_money: true,
                        amount_debit: true,
                        amount_credit: true,
                        created_at: true,
                        user: {
                            select: {
                                name: true
                            }
                        },
                        table: {
                            select: {
                                number: true
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'asc'
                    }
                });
                return payments;
            }
            if (type_payment === 'Dinheiro') {
                const payments = yield prisma_1.default.payment.findMany({
                    where: {
                        NOT: {
                            amount_money: ''
                        },
                        table_id: table_id,
                        user_id: user_id,
                        created_at: {
                            gte: new Date(date_from),
                            lte: new Date(date_to)
                        },
                    },
                    select: {
                        id: true,
                        total_amount: true,
                        amount_paid: true,
                        amount_pix: true,
                        amount_money: true,
                        amount_debit: true,
                        amount_credit: true,
                        created_at: true,
                        user: {
                            select: {
                                name: true
                            }
                        },
                        table: {
                            select: {
                                number: true
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'asc'
                    }
                });
                return payments;
            }
            if (type_payment === 'PIX') {
                const payments = yield prisma_1.default.payment.findMany({
                    where: {
                        NOT: {
                            amount_pix: ''
                        },
                        table_id: table_id,
                        user_id: user_id,
                        created_at: {
                            gte: new Date(date_from),
                            lte: new Date(date_to)
                        },
                    },
                    select: {
                        id: true,
                        total_amount: true,
                        amount_paid: true,
                        amount_pix: true,
                        amount_money: true,
                        amount_debit: true,
                        amount_credit: true,
                        created_at: true,
                        user: {
                            select: {
                                name: true
                            }
                        },
                        table: {
                            select: {
                                number: true
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'asc'
                    }
                });
                return payments;
            }
            if (type_payment === 'Débito') {
                const payments = yield prisma_1.default.payment.findMany({
                    where: {
                        NOT: {
                            amount_debit: ''
                        },
                        table_id: table_id,
                        user_id: user_id,
                        created_at: {
                            gte: new Date(date_from),
                            lte: new Date(date_to)
                        },
                    },
                    select: {
                        id: true,
                        total_amount: true,
                        amount_paid: true,
                        amount_pix: true,
                        amount_money: true,
                        amount_debit: true,
                        amount_credit: true,
                        created_at: true,
                        user: {
                            select: {
                                name: true
                            }
                        },
                        table: {
                            select: {
                                number: true
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'asc'
                    }
                });
                return payments;
            }
            if (type_payment === 'Crédito') {
                const payments = yield prisma_1.default.payment.findMany({
                    where: {
                        NOT: {
                            amount_credit: ''
                        },
                        table_id: table_id,
                        user_id: user_id,
                        created_at: {
                            gte: new Date(date_from),
                            lte: new Date(date_to)
                        },
                    },
                    select: {
                        id: true,
                        total_amount: true,
                        amount_paid: true,
                        amount_pix: true,
                        amount_money: true,
                        amount_debit: true,
                        amount_credit: true,
                        created_at: true,
                        user: {
                            select: {
                                name: true
                            }
                        },
                        table: {
                            select: {
                                number: true
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'asc'
                    }
                });
                return payments;
            }
        });
    }
}
exports.ListPaymentsService = ListPaymentsService;
