import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { CategoryItemProps } from "../../../pages/categories";
import { ProductItemProps } from "../../../pages/products";
import { TableItemProps } from "../../../pages/menu";

interface InputPropsCategory extends InputHTMLAttributes<HTMLInputElement> {
    isChecked: boolean;
    itemCategory: CategoryItemProps
    handleDisableCategory: (id: string, disable: boolean) => void;
}

interface InputPropsProduct extends InputHTMLAttributes<HTMLInputElement> {
    isChecked: boolean;
    itemProduct: ProductItemProps
    handleDisableProduct: (id: string, table_call_waiter: boolean) => void;
}

interface InputPropsTableCallWaiter extends InputHTMLAttributes<HTMLInputElement> {
    isChecked: boolean;
    itemTable: TableItemProps
    handleDisableTableCallWaiter: (id: string, table_call_waiter: boolean) => void;
}

interface InputPropsTableCloseBill extends InputHTMLAttributes<HTMLInputElement> {
    isChecked: boolean;
    itemTable: TableItemProps
    handleDisableTableCloseBill: (id: string, table_close_bill: boolean) => void;
}

export function SwitchCategory({ isChecked, itemCategory, handleDisableCategory }: InputPropsCategory) {
    return (
        <label className={styles.toggleSwitch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleDisableCategory(itemCategory.id, itemCategory.status)} />
            <span
                className={styles.switch}
                title="Habilitar / Desabilitar" />
        </label>
    );
}

export function SwitchProduct({ isChecked, itemProduct, handleDisableProduct }: InputPropsProduct) {
    return (
        <label className={styles.toggleSwitch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleDisableProduct(itemProduct.id, itemProduct.status)} />
            <span
                className={styles.switch}
                title="Habilitar / Desabilitar" />
        </label>
    );
}

export function SwitchTableCallWaiter({ isChecked, itemTable, handleDisableTableCallWaiter }: InputPropsTableCallWaiter) {
    return (
        <label className={styles.toggleSwitch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleDisableTableCallWaiter(itemTable.id, itemTable.table_call_waiter)} />
            <span
                className={styles.switch}
                title="Habilitar / Desabilitar" />
        </label>
    );
}

export function SwitchTableCloseBill({ isChecked, itemTable, handleDisableTableCloseBill }: InputPropsTableCloseBill) {
    return (
        <label className={styles.toggleSwitch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleDisableTableCloseBill(itemTable.id, itemTable.table_close_bill)} />
            <span
                className={styles.switch}
                title="Habilitar / Desabilitar" />
        </label>
    );
}