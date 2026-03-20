import { describe, it, vi, expect, beforeEach } from "vitest";
import { updateLock, resetUpdateLock, updateAmount } from "../logic/logic.js"; 

describe('updateLock', () => {

    beforeEach(() => {
        resetUpdateLock();
    } );

    it('should called updateAmount when unlocked', async () => {

        const updateAmount = vi.fn();

        await updateLock(updateAmount);

        expect(updateAmount).toHaveBeenCalled(1);
    } );

    it('should block every other call while running', async () => { 

        const updateAmount = vi.fn();

        const slowUpdateAmount = async () => new Promise(resolve => setTimeout(resolve, 100));

        updateLock(slowUpdateAmount); // start of a slow function
        await updateLock(updateAmount); // try to run immediately after

        expect(updateAmount).not.toHaveBeenCalled();
    } );

    it('should unlock when the function finishes', async () => {

        const updateAmount = vi.fn();

        await updateLock(updateAmount);
        await updateLock(updateAmount);


        expect(updateAmount).toHaveBeenCalled(2);
    } ); 

    it('should unlock if the function throw an error', async () => {
        
        const updateAmount = vi.fn(); 
        try {
        await updateLock( () => { throw new Error('an issue occur'); } );
        } catch (error) {

        }
        await updateLock(updateAmount);
        expect(updateAmount).toHaveBeenCalled(1);
    })
} );